import { getProperties, deleteProperty } from "@/app/actions";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink, Bed, Bath, Maximize2, Tag, Home } from "lucide-react";

export default async function AdminPropertiesPage() {
  const properties = await getProperties();

  const totalCount = properties.length;
  const rentCount = properties.filter((p) => p.purpose !== "sale" && p.purpose !== "buy").length;
  const saleCount = properties.filter((p) => p.purpose === "sale" || p.purpose === "buy").length;

  return (
    <div>
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0, color: "#18181b" }}>
            Properties Management
          </h1>
          <p style={{ color: "#71717a", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            Manage listings, update specs, review prices, or add new properties.
          </p>
        </div>

        <Link
          href="/admin/properties/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "var(--primary, #0f172a)",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Plus size={18} />
          Add New Property
        </Link>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "1.25rem",
            borderRadius: "10px",
            border: "1px solid #e4e4e7",
          }}
        >
          <div style={{ color: "#71717a", fontSize: "0.85rem", fontWeight: 500 }}>
            Total Listings
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, marginTop: "0.25rem" }}>
            {totalCount}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "1.25rem",
            borderRadius: "10px",
            border: "1px solid #e4e4e7",
          }}
        >
          <div style={{ color: "#71717a", fontSize: "0.85rem", fontWeight: 500 }}>
            For Rent
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, marginTop: "0.25rem", color: "#2563eb" }}>
            {rentCount}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "1.25rem",
            borderRadius: "10px",
            border: "1px solid #e4e4e7",
          }}
        >
          <div style={{ color: "#71717a", fontSize: "0.85rem", fontWeight: 500 }}>
            For Sale
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, marginTop: "0.25rem", color: "#16a34a" }}>
            {saleCount}
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          border: "1px solid #e4e4e7",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr
                style={{
                  backgroundColor: "#fafafa",
                  borderBottom: "1px solid #e4e4e7",
                  color: "#71717a",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <th style={{ padding: "1rem 1.25rem" }}>Property</th>
                <th style={{ padding: "1rem 1.25rem" }}>Type & Purpose</th>
                <th style={{ padding: "1rem 1.25rem" }}>Specs</th>
                <th style={{ padding: "1rem 1.25rem" }}>Price</th>
                <th style={{ padding: "1rem 1.25rem" }}>Status</th>
                <th style={{ padding: "1rem 1.25rem", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#71717a" }}>
                    <Home size={36} style={{ margin: "0 auto 0.75rem", opacity: 0.4 }} />
                    <p style={{ margin: 0, fontWeight: 500 }}>No properties found</p>
                    <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem" }}>
                      Get started by adding your first listing.
                    </p>
                  </td>
                </tr>
              )}

              {properties.map((property) => {
                const isSale = property.purpose === "sale" || property.purpose === "buy";
                const displayPrice = property.price?.startsWith("$") ? property.price : `$${property.price}`;

                return (
                  <tr
                    key={property.id}
                    style={{
                      borderBottom: "1px solid #f4f4f5",
                      transition: "background 0.15s ease",
                    }}
                  >
                    {/* Property info & thumbnail */}
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <img
                          src={property.image}
                          alt={property.title}
                          style={{
                            width: "60px",
                            height: "50px",
                            borderRadius: "8px",
                            objectFit: "cover",
                            backgroundColor: "#f4f4f5",
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: "#18181b", fontSize: "0.95rem" }}>
                            {property.title}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#71717a", marginTop: "2px" }}>
                            {property.address}
                          </div>
                          {property.referenceNumber && (
                            <span
                              style={{
                                display: "inline-block",
                                fontSize: "0.7rem",
                                fontWeight: 600,
                                backgroundColor: "#f4f4f5",
                                color: "#52525b",
                                padding: "1px 6px",
                                borderRadius: "4px",
                                marginTop: "3px",
                              }}
                            >
                              Ref: {property.referenceNumber}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Type & Purpose */}
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontWeight: 500, fontSize: "0.875rem", color: "#27272a" }}>
                          {property.type || "House"} • {property.category}
                        </span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            width: "fit-content",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: "4px",
                            backgroundColor: isSale ? "#dcfce7" : "#dbeafe",
                            color: isSale ? "#15803d" : "#1e40af",
                          }}
                        >
                          <Tag size={12} />
                          {isSale ? "For Sale" : `For Rent (${property.rentType || "nightly"})`}
                        </span>
                      </div>
                    </td>

                    {/* Specs */}
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <div style={{ display: "flex", gap: "0.75rem", color: "#52525b", fontSize: "0.8rem", flexWrap: "wrap" }}>
                        {property.bedrooms != null && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }} title="Bedrooms">
                            <Bed size={14} /> {property.bedrooms} bds
                          </span>
                        )}
                        {property.bathrooms != null && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }} title="Bathrooms">
                            <Bath size={14} /> {property.bathrooms} ba
                          </span>
                        )}
                        {property.surfaceArea != null && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }} title="Surface Area">
                            <Maximize2 size={13} /> {property.surfaceArea} m²
                          </span>
                        )}
                        {property.bedrooms == null && property.bathrooms == null && property.surfaceArea == null && (
                          <span style={{ color: "#a1a1aa" }}>—</span>
                        )}
                      </div>
                      {property.typology && (
                        <div style={{ fontSize: "0.75rem", color: "#71717a", marginTop: "2px" }}>
                          {property.typology}
                        </div>
                      )}
                    </td>

                    {/* Price */}
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <div style={{ fontWeight: 600, color: "#18181b", fontSize: "0.95rem" }}>
                        {displayPrice}
                      </div>
                      {property.priceNote && (
                        <div style={{ fontSize: "0.75rem", color: "#71717a" }}>
                          {property.priceNote}
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          backgroundColor: property.status === "Active" ? "#dcfce7" : "#f4f4f5",
                          color: property.status === "Active" ? "#166534" : "#71717a",
                        }}
                      >
                        {property.status || "Active"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                        <Link
                          href={`/properties/${property.id}`}
                          target="_blank"
                          title="View Live Listing"
                          style={{
                            padding: "0.4rem 0.6rem",
                            borderRadius: "6px",
                            backgroundColor: "#f4f4f5",
                            color: "#52525b",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          <ExternalLink size={15} />
                        </Link>

                        <Link
                          href={`/admin/properties/${property.id}/edit`}
                          title="Edit Property"
                          style={{
                            padding: "0.4rem 0.6rem",
                            borderRadius: "6px",
                            backgroundColor: "#e0e7ff",
                            color: "#3730a3",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          <Edit size={15} />
                        </Link>

                        <form
                          action={async () => {
                            "use server";
                            await deleteProperty(property.id);
                          }}
                          style={{ display: "inline" }}
                        >
                          <button
                            type="submit"
                            title="Delete Property"
                            style={{
                              padding: "0.4rem 0.6rem",
                              borderRadius: "6px",
                              backgroundColor: "#fee2e2",
                              color: "#dc2626",
                              border: "none",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}