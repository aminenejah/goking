import { editProperty, getProperties } from "@/app/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import {
  SingleImageUpload,
  GalleryImageUpload,
} from "@/components/admin/ImageUpload";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  borderRadius: "6px",
  border: "1px solid #d4d4d8",
  outline: "none",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  backgroundColor: "#fff",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  fontWeight: 500,
  marginBottom: "0.5rem",
};

export default async function EditProperty({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramId } = await params;
  const properties = await getProperties();
  const property = properties.find((p) => p.id.toString() === paramId);

  if (!property) return <div>Property not found</div>;

  const updateAction = async (formData: FormData) => {
    "use server";
    await editProperty(property!.id, formData);
    redirect("/admin/properties");
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Link
          href="/admin/properties"
          style={{
            display: "flex",
            alignItems: "center",
            color: "#71717a",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={20} style={{ marginRight: "0.5rem" }} />
          Back
        </Link>

        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>
          Edit Property
        </h1>
      </div>

      {/* Form Card */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          maxWidth: "800px",
        }}
      >
        <form action={updateAction}>
          <div
            style={{
              padding: "2rem",
              borderBottom: "1px solid #e4e4e7",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "1.5rem",
              }}
            >
              Property Details
            </h2>

            <div style={{ display: "grid", gap: "1.5rem" }}>
              {/* Property Title & Reference */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <label style={labelStyle}>Property Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={property.title}
                    required
                    placeholder="e.g. Mega Yacht Dubai"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Reference Number</label>
                  <input
                    type="text"
                    name="referenceNumber"
                    defaultValue={property.referenceNumber || ""}
                    placeholder="e.g. REF-104"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Property Type and Category */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <label style={labelStyle}>Property Type</label>

                  <select name="type" defaultValue={property.type} required style={selectStyle}>
                    <option value="House">Luxury House</option>
                    <option value="Villa">Villa</option>
                    <option value="Yacht">Yacht</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Castle">Castle</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Room">Room</option>
                    <option value="Land">Land</option>
                    <option value="Event">
                      Event Hall / Music Venue
                    </option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>
                    Category (used for homepage filters)
                  </label>

                  <select name="category" defaultValue={property.category} required style={selectStyle}>
                    <option value="villas">Villa</option>
                    <option value="apartments">Apartment</option>
                    <option value="houses">House</option>
                    <option value="penthouses">Penthouse</option>
                    <option value="castles">Castle</option>
                    <option value="yachts">Yacht</option>
                    <option value="rooms">Room</option>
                    <option value="land">Land</option>
                  </select>
                </div>
              </div>

              {/* Specifications: Typology, Surface Area, Bedrooms, Bathrooms, Condition */}
              <div
                style={{
                  padding: "1.25rem",
                  backgroundColor: "#fafafa",
                  borderRadius: "8px",
                  border: "1px solid #e4e4e7",
                }}
              >
                <label
                  style={{
                    ...labelStyle,
                    fontWeight: 600,
                    marginBottom: "1rem",
                  }}
                >
                  Property Specifications
                </label>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <label style={{ ...labelStyle, fontSize: "0.8rem" }}>
                      Surface Area (m²)
                    </label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      name="surfaceArea"
                      defaultValue={property.surfaceArea ?? ""}
                      placeholder="e.g. 350"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ ...labelStyle, fontSize: "0.8rem" }}>
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="bedrooms"
                      defaultValue={property.bedrooms ?? ""}
                      placeholder="e.g. 4"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ ...labelStyle, fontSize: "0.8rem" }}>
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="bathrooms"
                      defaultValue={property.bathrooms ?? ""}
                      placeholder="e.g. 3"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ ...labelStyle, fontSize: "0.8rem" }}>
                      Typology
                    </label>
                    <input
                      type="text"
                      name="typology"
                      defaultValue={property.typology || ""}
                      placeholder="e.g. Duplex, T4"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ ...labelStyle, fontSize: "0.8rem" }}>
                      Condition
                    </label>
                    <select name="condition" defaultValue={property.condition || "Brand New"} style={selectStyle}>
                      <option value="Brand New">Brand New</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Renovated">Renovated</option>
                      <option value="Under Construction">Under Construction</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Listing Purpose */}
              <div
                style={{
                  padding: "1.25rem",
                  backgroundColor: "#fafafa",
                  borderRadius: "8px",
                  border: "1px solid #e4e4e7",
                }}
              >
                <label
                  style={{
                    ...labelStyle,
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                  }}
                >
                  Listing Purpose
                </label>

                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="purpose"
                      value="rent"
                      defaultChecked={property.purpose !== 'sale'}
                    />
                    For Rent
                  </label>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="purpose"
                      value="sale"
                      defaultChecked={property.purpose === 'sale'}
                    />
                    For Sale
                  </label>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        ...labelStyle,
                        fontSize: "0.8rem",
                      }}
                    >
                      Rent Type
                    </label>

                    <select name="rentType" defaultValue={property.rentType || "nightly"} style={selectStyle}>
                      <option value="nightly">Per Night</option>
                      <option value="daily">Per Day</option>
                      <option value="weekly">Per Week</option>
                      <option value="monthly">Per Month</option>
                      <option value="hourly">Per Hour</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        ...labelStyle,
                        fontSize: "0.8rem",
                      }}
                    >
                      Price Note
                    </label>

                    <input
                      type="text"
                      name="priceNote"
                      defaultValue={property.priceNote}
                      placeholder="e.g. per night"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Price */}
              <div>
                <label style={labelStyle}>Price ($)</label>

                <input
                  type="text"
                  name="price"
                  defaultValue={property.price}
                  required
                  placeholder="e.g. 5,000 or 5000000"
                  style={inputStyle}
                />
              </div>

              {/* Description */}
              <div>
                <label style={labelStyle}>Description</label>

                <textarea
                  name="description"
                  defaultValue={property.description}
                  required
                  rows={5}
                  placeholder="Describe this property..."
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Location */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 2fr",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <label style={labelStyle}>Latitude</label>

                  <input
                    type="number"
                    step="any"
                    name="lat"
                    defaultValue={property.lat}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Longitude</label>

                  <input
                    type="number"
                    step="any"
                    name="lng"
                    defaultValue={property.lng}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Written Address</label>

                  <input
                    type="text"
                    name="address"
                    defaultValue={property.address}
                    required
                    placeholder="e.g. Hammamet, Tunisia"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Main Image */}
              <div>
                <label style={labelStyle}>Main Property Image</label>

                <SingleImageUpload name="image" defaultValue={property.image} />
              </div>

              {/* Floor Plan Image */}
              <div>
                <label style={labelStyle}>Floor Plan Image (Optional)</label>

                <SingleImageUpload name="floorPlanImage" defaultValue={property.floorPlanImage} />
              </div>

              {/* Gallery */}
              <div>
                <label style={labelStyle}>Property Gallery</label>

                <GalleryImageUpload name="images" defaultValue={property.images} />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div
            style={{
              padding: "2rem",
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
            }}
          >
            <Link
              href="/admin/properties"
              style={{
                padding: "0.75rem 2rem",
                borderRadius: "8px",
                border: "1px solid #d4d4d8",
                fontWeight: 600,
                color: "#1c1c1c",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Cancel
            </Link>

            <button
              type="submit"
              style={{
                backgroundColor: "var(--primary)",
                color: "#fff",
                padding: "0.75rem 2rem",
                borderRadius: "8px",
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}