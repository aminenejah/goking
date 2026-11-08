"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// ─────────────────────────────────────────────
// SETTINGS
// ─────────────────────────────────────────────

export async function getSettings() {
  try {
    const { data, error } = await supabaseAdmin
      .from("settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (!error && data && data.platform_name) {
      return {
        platformName: data.platform_name,
        supportEmail: data.support_email || "",
        phone: data.phone || "",
        address: data.address || "",
      };
    }
  } catch (err) {
    console.error("Error fetching settings from supabase:", err);
  }

  // Fallback to local data/settings.json
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const settingsPath = path.join(process.cwd(), "data", "settings.json");
    const raw = await fs.readFile(settingsPath, "utf-8");
    const json = JSON.parse(raw);
    return {
      platformName: json.platformName || "Aveneo Real Estate",
      supportEmail: json.supportEmail || "contact@aveneorealestate.com",
      phone: json.phone || "+216 71 000 000",
      address: json.address || "Les Berges du Lac 2, Tunis, Tunisia",
    };
  } catch {
    return {
      platformName: "Aveneo Real Estate",
      supportEmail: "contact@aveneorealestate.com",
      phone: "+216 71 000 000",
      address: "Les Berges du Lac 2, Tunis, Tunisia",
    };
  }
}

export async function saveSettings(formData: FormData) {
  const settingsData = {
    id: 1,
    platform_name: formData.get("platformName") as string,
    support_email: formData.get("supportEmail") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
  };

  const { error } = await supabaseAdmin
    .from("settings")
    .upsert(settingsData);

  if (error) {
    console.error("Error saving settings to db:", error);
  }

  // Also sync to local data/settings.json for resilience
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const settingsPath = path.join(process.cwd(), "data", "settings.json");
    await fs.writeFile(
      settingsPath,
      JSON.stringify(
        {
          platformName: settingsData.platform_name,
          supportEmail: settingsData.support_email,
          phone: settingsData.phone,
          address: settingsData.address,
        },
        null,
        2
      )
    );
  } catch (err) {
    console.error("Error saving settings to local json:", err);
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}

// ─────────────────────────────────────────────
// PROPERTIES
// ─────────────────────────────────────────────

export async function getProperties() {
  const { data, error } = await supabaseAdmin
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching properties:", error);
    return [];
  }

  return (data ?? []).map(mapProperty);
}

export async function getProperty(id: number) {
  const { data, error } = await supabaseAdmin
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapProperty(data);
}

export async function addProperty(formData: FormData) {
  const images = formData.get("images")
    ? (formData.get("images") as string).split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const surfaceAreaVal = formData.get("surfaceArea");
  const bedroomsVal = formData.get("bedrooms");
  const bathroomsVal = formData.get("bathrooms");

  const { error } = await supabaseAdmin.from("properties").insert({
    title: formData.get("title") as string,
    type: formData.get("type") as string,
    category: formData.get("category") as string,
    purpose: (formData.get("purpose") as string) || "rent",
    rent_type: (formData.get("rentType") as string) || null,
    host: "Hosted by Admin",
    date: "Available Now",
    price: formData.get("price") as string,
    price_note: (formData.get("priceNote") as string) || "",
    rating: 5.0,
    image:
      (formData.get("image") as string) ||
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
    images,
    floor_plan_image: (formData.get("floorPlanImage") as string) || null,
    description: formData.get("description") as string,
    lat: Number(formData.get("lat")),
    lng: Number(formData.get("lng")),
    address: formData.get("address") as string,
    status: "Active",
    surface_area: surfaceAreaVal ? Number(surfaceAreaVal) : null,
    typology: (formData.get("typology") as string) || null,
    bedrooms: bedroomsVal ? parseInt(bedroomsVal as string, 10) : null,
    bathrooms: bathroomsVal ? parseInt(bathroomsVal as string, 10) : null,
    condition: (formData.get("condition") as string) || null,
    reference_number: (formData.get("referenceNumber") as string) || null,
  });

  if (error) {
    console.error("Error adding property:", error);
    return { error: "Failed to add property" };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/properties");
  return { success: true };
}

export async function editProperty(id: number, formData: FormData) {
  const images = formData.get("images")
    ? (formData.get("images") as string).split(",").map((s) => s.trim()).filter(Boolean)
    : undefined;

  const surfaceAreaVal = formData.get("surfaceArea");
  const bedroomsVal = formData.get("bedrooms");
  const bathroomsVal = formData.get("bathrooms");

  const updateData: Record<string, unknown> = {
    title: formData.get("title") as string,
    type: formData.get("type") as string,
    category: formData.get("category") as string,
    purpose: formData.get("purpose") as string,
    rent_type: (formData.get("rentType") as string) || null,
    price: formData.get("price") as string,
    price_note: (formData.get("priceNote") as string) || "",
    description: formData.get("description") as string,
    address: formData.get("address") as string,
    lat: Number(formData.get("lat")),
    lng: Number(formData.get("lng")),
    surface_area: surfaceAreaVal ? Number(surfaceAreaVal) : null,
    typology: (formData.get("typology") as string) || null,
    bedrooms: bedroomsVal ? parseInt(bedroomsVal as string, 10) : null,
    bathrooms: bathroomsVal ? parseInt(bathroomsVal as string, 10) : null,
    condition: (formData.get("condition") as string) || null,
    reference_number: (formData.get("referenceNumber") as string) || null,
  };

  const imageUrl = formData.get("image") as string;
  if (imageUrl) updateData.image = imageUrl;
  if (images) updateData.images = images;
  const floorPlan = formData.get("floorPlanImage") as string;
  if (floorPlan !== undefined) updateData.floor_plan_image = floorPlan || null;

  const { error } = await supabaseAdmin
    .from("properties")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error editing property:", error);
    return { error: "Failed to update property" };
  }

  revalidatePath("/");
  revalidatePath(`/properties/${id}`);
  revalidatePath("/admin");
  revalidatePath("/admin/properties");
  return { success: true };
}

export async function deleteProperty(id: number) {
  const { error } = await supabaseAdmin
    .from("properties")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting property:", error);
    return { error: "Failed to delete property" };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/properties");
  return { success: true };
}

// ─────────────────────────────────────────────
// BOOKINGS
// ─────────────────────────────────────────────

export async function getBookings() {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }

  return (data ?? []).map(mapBooking);
}

export async function createBooking(booking: {
  propertyId: number;
  propertyTitle: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  amount: string;
}) {
  const { error } = await supabaseAdmin.from("bookings").insert({
    property_id: booking.propertyId,
    property_title: booking.propertyTitle,
    guest_name: booking.guestName,
    guest_email: booking.guestEmail,
    check_in: booking.checkIn,
    check_out: booking.checkOut,
    amount: booking.amount,
    status: "Pending",
  });

  if (error) {
    console.error("Error creating booking:", error);
    return { error: "Failed to create booking" };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/bookings");
  revalidatePath("/admin/accounting");
  return { success: true };
}

export async function updateBookingStatus(id: number, status: string) {
  const { error } = await supabaseAdmin
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating booking status:", error);
    return { error: "Failed to update booking" };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/bookings");
  revalidatePath("/admin/accounting");
  return { success: true };
}

// ─────────────────────────────────────────────
// REVIEWS
// ─────────────────────────────────────────────

export async function getReviews() {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return data ?? [];
}

export async function addReview(review: {
  client: string;
  property: string;
  rating: number;
  comment: string;
}) {
  const { error } = await supabaseAdmin.from("reviews").insert({
    client: review.client,
    property: review.property,
    rating: review.rating,
    comment: review.comment,
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    status: "Pending",
  });

  if (error) {
    console.error("Error adding review:", error);
    return { error: "Failed to add review" };
  }

  revalidatePath("/");
  revalidatePath("/admin/reviews");
  return { success: true };
}

export async function updateReviewStatus(id: number, status: string) {
  const { error } = await supabaseAdmin
    .from("reviews")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating review status:", error);
    return { error: "Failed to update review" };
  }

  revalidatePath("/");
  revalidatePath("/admin/reviews");
  return { success: true };
}

export async function deleteReview(id: number) {
  const { error } = await supabaseAdmin
    .from("reviews")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting review:", error);
    return { error: "Failed to delete review" };
  }

  revalidatePath("/");
  revalidatePath("/admin/reviews");
  return { success: true };
}

// ─────────────────────────────────────────────
// CONTENT
// ─────────────────────────────────────────────

export async function getContent() {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const contentPath = path.join(process.cwd(), "data", "content.json");
    const raw = await fs.readFile(contentPath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { hero: {}, categories: [], services: [] };
  }
}

export async function saveContent(contentData: unknown) {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const contentPath = path.join(process.cwd(), "data", "content.json");
    await fs.writeFile(contentPath, JSON.stringify(contentData, null, 2));
    revalidatePath("/");
    revalidatePath("/admin/content");
    return { success: true };
  } catch (error) {
    console.error("Error saving content:", error);
    return { error: "Failed to save content" };
  }
}

// ─────────────────────────────────────────────
// MAPPERS  (snake_case DB → camelCase app)
// ─────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProperty(row: any) {
  return {
    id: row.id as number,
    title: row.title as string,
    type: row.type as string,
    category: row.category as string,
    purpose: row.purpose as string,
    rentType: row.rent_type as string | null,
    host: row.host as string,
    date: row.date as string,
    price: row.price as string,
    priceNote: row.price_note as string,
    rating: row.rating as number,
    image: row.image as string,
    images: row.images as string[],
    video: row.video as string | null,
    description: row.description as string,
    lat: row.lat as number,
    lng: row.lng as number,
    address: row.address as string,
    amenities: row.amenities as string[],
    status: row.status as string,
    createdAt: row.created_at as string,
    originalPrice: row.original_price as string | null,
    discountExpiresAt: row.discount_expires_at as string | null,
    surfaceArea: row.surface_area != null ? Number(row.surface_area) : null,
    typology: (row.typology as string) || null,
    bedrooms: row.bedrooms != null ? Number(row.bedrooms) : null,
    bathrooms: row.bathrooms != null ? Number(row.bathrooms) : null,
    condition: (row.condition as string) || null,
    referenceNumber: (row.reference_number as string) || null,
    floorPlanImage: (row.floor_plan_image as string) || null,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBooking(row: any) {
  return {
    id: row.id as number,
    propertyId: row.property_id as number,
    propertyTitle: row.property_title as string,
    guestName: row.guest_name as string,
    guestEmail: row.guest_email as string,
    checkIn: row.check_in as string,
    checkOut: row.check_out as string,
    amount: row.amount as string,
    status: row.status as string,
    createdAt: row.created_at as string,
  };
}