
import { getProperty, getSettings } from "@/app/actions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapWrapper from "@/components/MapWrapper";
import BookingForm from "@/components/BookingForm";
import { Star, MapPin, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PropertyDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetails({
  params,
}: PropertyDetailsProps) {
  const { id } = await params;
  const propertyId = Number(id);

  if (!Number.isInteger(propertyId) || propertyId <= 0) {
    notFound();
  }

  const [property, settings] = await Promise.all([
    getProperty(propertyId),
    getSettings(),
  ]);

  if (!property) {
    return (
      <>
        <Navbar settings={settings} />
        <div
          className="container"
          style={{
            paddingTop: "120px",
            minHeight: "60vh",
            textAlign: "center",
          }}
        >
          <h1>Property Not Found</h1>
          <Link
            href="/"
            style={{
              color: "var(--primary)",
              marginTop: "1rem",
              display: "inline-block",
            }}
          >
            Return Home
          </Link>
        </div>
        <Footer settings={settings} />
      </>
    );
  }

  const images =
    property.images?.filter(
      (image: string) => typeof image === "string" && image.trim() !== ""
    ) ?? [];

  const galleryImages =
    images.length > 0
      ? images
      : property.image
        ? [property.image]
        : [];

  const isSale =
    property.purpose === "sale" || property.purpose === "buy";

  const displayPrice = property.price
    ? property.price.startsWith("$")
      ? property.price
      : `$${property.price}`
    : "Price on request";

  const hasMapCoordinates =
    property.lat != null &&
    property.lng != null &&
    Number.isFinite(Number(property.lat)) &&
    Number.isFinite(Number(property.lng));

  const amenities = Array.isArray(property.amenities)
    ? property.amenities
    : [];

  return (
    <>
      <Navbar settings={settings} />

      <main style={{ paddingTop: "100px", paddingBottom: "8rem" }}>
        <div className="container">
          {/* Property Header */}
          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  backgroundColor: isSale ? "#dcfce7" : "#dbeafe",
                  color: isSale ? "#15803d" : "#1e40af",
                }}
              >
                {isSale
                  ? "For Sale"
                  : `For Rent • ${property.rentType || "Nightly"}`}
              </span>

              {property.referenceNumber && (
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    backgroundColor: "#f4f4f5",
                    color: "#52525b",
                  }}
                >
                  Ref: {property.referenceNumber}
                </span>
              )}

              {property.condition && (
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    backgroundColor: "#fef3c7",
                    color: "#92400e",
                  }}
                >
                  {property.condition}
                </span>
              )}
            </div>

            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              {property.title}
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                color: "#71717a",
                fontSize: "0.875rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  color: "#1c1c1c",
                  fontWeight: 600,
                }}
              >
                <Star size={16} fill="#1c1c1c" />
                {property.rating ?? "New"}
              </span>

              {property.address && (
                <>
                  <span>•</span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <MapPin size={16} />
                    {property.address}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Property Gallery */}
          {galleryImages.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  galleryImages.length > 1 ? "2fr 1fr" : "1fr",
                gap: "1rem",
                height: "500px",
                marginBottom: "3rem",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <img
                src={galleryImages[0]}
                alt={property.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {galleryImages.length > 1 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: "1fr 1fr",
                    gap: "1rem",
                    minHeight: 0,
                  }}
                >
                  <img
                    src={galleryImages[1]}
                    alt={`${property.title} - Gallery 1`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  <img
                    src={galleryImages[2] || galleryImages[1]}
                    alt={`${property.title} - Gallery 2`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Main Content */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "4rem",
            }}
          >
            <div>
              {/* Property Specifications */}
              <div
                style={{
                  paddingBottom: "2rem",
                  borderBottom: "1px solid #e4e4e7",
                  marginBottom: "2rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  {property.type}
                  {property.typology ? ` (${property.typology})` : ""}
                  {" "}hosted by{" "}
                  {property.host
                    ? property.host.replace("Hosted by ", "")
                    : "Admin"}
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  {property.bedrooms != null && (
                    <div className="property-spec">
                      🛏️ {property.bedrooms} Bedrooms
                    </div>
                  )}

                  {property.bathrooms != null && (
                    <div className="property-spec">
                      🚿 {property.bathrooms} Bathrooms
                    </div>
                  )}

                  {property.surfaceArea != null && (
                    <div className="property-spec">
                      📐 {property.surfaceArea} m² Living Area
                    </div>
                  )}

                  {property.typology && (
                    <div className="property-spec">
                      🏛️ Typology: {property.typology}
                    </div>
                  )}
                </div>
              </div>

              {/* About */}
              <div
                style={{
                  paddingBottom: "2rem",
                  borderBottom: "1px solid #e4e4e7",
                  marginBottom: "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    marginBottom: "1rem",
                  }}
                >
                  About this place
                </h3>

                <p
                  style={{
                    color: "#3f3f46",
                    lineHeight: "1.7",
                    whiteSpace: "pre-line",
                  }}
                >
                  {property.description ||
                    "Contact us for more information about this property."}
                </p>
              </div>

              {/* Floor Plan */}
              {property.floorPlanImage && (
                <div
                  style={{
                    paddingBottom: "2rem",
                    borderBottom: "1px solid #e4e4e7",
                    marginBottom: "2rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      marginBottom: "1rem",
                    }}
                  >
                    Floor Plan
                  </h3>

                  <div
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: "1px solid #e4e4e7",
                      maxWidth: "600px",
                    }}
                  >
                    <img
                      src={property.floorPlanImage}
                      alt="Property floor plan"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Amenities */}
              {amenities.length > 0 && (
                <div
                  style={{
                    paddingBottom: "2rem",
                    borderBottom: "1px solid #e4e4e7",
                    marginBottom: "2rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      marginBottom: "1rem",
                    }}
                  >
                    What this place offers
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    {amenities.map((amenity: string, index: number) => (
                      <div
                        key={`${amenity}-${index}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          color: "#3f3f46",
                        }}
                      >
                        <CheckCircle size={20} color="#71717a" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Tour */}
              {property.video && (
                <div
                  style={{
                    paddingBottom: "2rem",
                    borderBottom: "1px solid #e4e4e7",
                    marginBottom: "2rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      marginBottom: "1rem",
                    }}
                  >
                    Virtual Tour & Video
                  </h3>

                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                      overflow: "hidden",
                      borderRadius: "12px",
                    }}
                  >
                    <iframe
                      src={property.video}
                      title="Property Video Tour"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "none",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Location */}
              {hasMapCoordinates && (
                <div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      marginBottom: "1rem",
                    }}
                  >
                    Where you'll be
                  </h3>

                  {property.address && (
                    <p
                      style={{
                        color: "#71717a",
                        marginBottom: "1rem",
                      }}
                    >
                      {property.address}
                    </p>
                  )}

                  <MapWrapper
                    lat={Number(property.lat)}
                    lng={Number(property.lng)}
                    title={property.title}
                  />
                </div>
              )}
            </div>

            {/* Price and Booking */}
            <div>
              <div
                style={{
                  position: "sticky",
                  top: "120px",
                  backgroundColor: "#fff",
                  border: "1px solid #e4e4e7",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                }}
              >
                <div
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    marginBottom: "1.5rem",
                    color: "#18181b",
                  }}
                >
                  {displayPrice}

                  <span
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 400,
                      color: "#71717a",
                      marginLeft: "0.5rem",
                    }}
                  >
                    {isSale
                      ? "sale price"
                      : property.priceNote ||
                      `/${property.rentType || "night"}`}
                  </span>
                </div>

                {isSale ? (
                  <p
                    style={{
                      color: "#71717a",
                      lineHeight: 1.6,
                    }}
                  >
                    Interested in this property? Contact us to arrange a visit
                    and receive more information.
                  </p>
                ) : (
                  <BookingForm
                    propertyId={property.id}
                    propertyTitle={property.title}
                    pricePerNight={displayPrice}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </>
  );
}
