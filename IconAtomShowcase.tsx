// ============================================================================
//  ICON ATOM SHOWCASE
//  Demonstrates all IconAtom variants and sizes following Figma specs.
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import * as React from "react";
import { IconAtom } from "../../atoms/IconAtom";
import { Home, Settings, User, Mail, Bell, Search, Heart, Star } from "lucide-react";

export default function IconAtomShowcase() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        padding: "var(--space-12) var(--space-8)",
        fontFamily: "var(--font-family-primary)",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          marginBottom: "var(--space-12)",
        }}
      >
        <h1
          style={{
            fontSize: "var(--font-size-4xl)",
            fontWeight: "var(--font-weight-bold)",
            fontFamily: "var(--font-family-display)",
            color: "var(--fg-primary)",
            marginBottom: "var(--space-2)",
          }}
        >
          Icon Atom
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-lg)",
            color: "var(--fg-secondary)",
            lineHeight: "var(--line-height-lg)",
          }}
        >
          Icon wrapper component following Figma design system specifications.
          Two variants: <strong>plain</strong> (transparent) and{" "}
          <strong>tile</strong> (background). Sizes: 48px, 32px, 20px, 16px.
        </p>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-12)",
        }}
      >
        {/* Plain Variant - All Sizes */}
        <section>
          <h2
            style={{
              fontSize: "var(--font-size-2xl)",
              fontWeight: "var(--font-weight-semibold)",
              fontFamily: "var(--font-family-display)",
              color: "var(--fg-primary)",
              marginBottom: "var(--space-4)",
            }}
          >
            Plain Variant
          </h2>
          <p
            style={{
              fontSize: "var(--font-size-md)",
              color: "var(--fg-secondary)",
              marginBottom: "var(--space-6)",
            }}
          >
            Transparent background with dark icon color.
          </p>

          {/* Size Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "var(--space-8)",
            }}
          >
            {/* 48px */}
            <div
              style={{
                padding: "var(--space-6)",
                background: "var(--bg-secondary)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                  marginBottom: "var(--space-3)",
                }}
              >
                <IconAtom size={48} variant="plain" icon={<Home />} />
                <div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    48px
                  </div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--fg-tertiary)",
                    }}
                  >
                    Large size
                  </div>
                </div>
              </div>
            </div>

            {/* 32px */}
            <div
              style={{
                padding: "var(--space-6)",
                background: "var(--bg-secondary)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                  marginBottom: "var(--space-3)",
                }}
              >
                <IconAtom size={32} variant="plain" icon={<Settings />} />
                <div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    32px
                  </div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--fg-tertiary)",
                    }}
                  >
                    Default size
                  </div>
                </div>
              </div>
            </div>

            {/* 20px */}
            <div
              style={{
                padding: "var(--space-6)",
                background: "var(--bg-secondary)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                  marginBottom: "var(--space-3)",
                }}
              >
                <IconAtom size={20} variant="plain" icon={<User />} />
                <div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    20px
                  </div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--fg-tertiary)",
                    }}
                  >
                    Small size
                  </div>
                </div>
              </div>
            </div>

            {/* 16px */}
            <div
              style={{
                padding: "var(--space-6)",
                background: "var(--bg-secondary)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                  marginBottom: "var(--space-3)",
                }}
              >
                <IconAtom size={16} variant="plain" icon={<Mail />} />
                <div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    16px
                  </div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--fg-tertiary)",
                    }}
                  >
                    Extra small
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tile Variant - All Sizes */}
        <section>
          <h2
            style={{
              fontSize: "var(--font-size-2xl)",
              fontWeight: "var(--font-weight-semibold)",
              fontFamily: "var(--font-family-display)",
              color: "var(--fg-primary)",
              marginBottom: "var(--space-4)",
            }}
          >
            Tile Variant
          </h2>
          <p
            style={{
              fontSize: "var(--font-size-md)",
              color: "var(--fg-secondary)",
              marginBottom: "var(--space-6)",
            }}
          >
            Light teal background with TEAL brand icon color. Background uses{" "}
            <code
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "var(--font-size-sm)",
                background: "var(--bg-secondary)",
                padding: "2px 6px",
                borderRadius: "var(--radius-xs)",
              }}
            >
              var(--bg-brand-subtle)
            </code>
            .
          </p>

          {/* Size Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "var(--space-8)",
            }}
          >
            {/* 48px */}
            <div
              style={{
                padding: "var(--space-6)",
                background: "var(--bg-secondary)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                  marginBottom: "var(--space-3)",
                }}
              >
                <IconAtom size={48} variant="tile" icon={<Bell />} />
                <div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    48px
                  </div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--fg-tertiary)",
                    }}
                  >
                    8px radius
                  </div>
                </div>
              </div>
            </div>

            {/* 32px */}
            <div
              style={{
                padding: "var(--space-6)",
                background: "var(--bg-secondary)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                  marginBottom: "var(--space-3)",
                }}
              >
                <IconAtom size={32} variant="tile" icon={<Search />} />
                <div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    32px
                  </div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--fg-tertiary)",
                    }}
                  >
                    8px radius
                  </div>
                </div>
              </div>
            </div>

            {/* 20px */}
            <div
              style={{
                padding: "var(--space-6)",
                background: "var(--bg-secondary)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                  marginBottom: "var(--space-3)",
                }}
              >
                <IconAtom size={20} variant="tile" icon={<Heart />} />
                <div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    20px
                  </div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--fg-tertiary)",
                    }}
                  >
                    4px radius
                  </div>
                </div>
              </div>
            </div>

            {/* 16px */}
            <div
              style={{
                padding: "var(--space-6)",
                background: "var(--bg-secondary)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                  marginBottom: "var(--space-3)",
                }}
              >
                <IconAtom size={16} variant="tile" icon={<Star />} />
                <div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    16px
                  </div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--fg-tertiary)",
                    }}
                  >
                    4px radius
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Icons Row */}
        <section>
          <h2
            style={{
              fontSize: "var(--font-size-2xl)",
              fontWeight: "var(--font-weight-semibold)",
              fontFamily: "var(--font-family-display)",
              color: "var(--fg-primary)",
              marginBottom: "var(--space-4)",
            }}
          >
            Icon Gallery
          </h2>
          <p
            style={{
              fontSize: "var(--font-size-md)",
              color: "var(--fg-secondary)",
              marginBottom: "var(--space-6)",
            }}
          >
            Various icons demonstrating both variants at 32px size.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-4)",
            }}
          >
            <IconAtom size={32} variant="plain" icon={<Home />} />
            <IconAtom size={32} variant="tile" icon={<Home />} />
            <IconAtom size={32} variant="plain" icon={<Settings />} />
            <IconAtom size={32} variant="tile" icon={<Settings />} />
            <IconAtom size={32} variant="plain" icon={<User />} />
            <IconAtom size={32} variant="tile" icon={<User />} />
            <IconAtom size={32} variant="plain" icon={<Mail />} />
            <IconAtom size={32} variant="tile" icon={<Mail />} />
            <IconAtom size={32} variant="plain" icon={<Bell />} />
            <IconAtom size={32} variant="tile" icon={<Bell />} />
            <IconAtom size={32} variant="plain" icon={<Search />} />
            <IconAtom size={32} variant="tile" icon={<Search />} />
            <IconAtom size={32} variant="plain" icon={<Heart />} />
            <IconAtom size={32} variant="tile" icon={<Heart />} />
            <IconAtom size={32} variant="plain" icon={<Star />} />
            <IconAtom size={32} variant="tile" icon={<Star />} />
          </div>
        </section>

        {/* Props Table */}
        <section>
          <h2
            style={{
              fontSize: "var(--font-size-2xl)",
              fontWeight: "var(--font-weight-semibold)",
              fontFamily: "var(--font-family-display)",
              color: "var(--fg-primary)",
              marginBottom: "var(--space-4)",
            }}
          >
            Props
          </h2>
          <div
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "var(--font-size-sm)",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "var(--bg-secondary)",
                    borderBottom: "1px solid var(--border-default)",
                  }}
                >
                  <th
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      textAlign: "left",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    Prop
                  </th>
                  <th
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      textAlign: "left",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    Type
                  </th>
                  <th
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      textAlign: "left",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    Default
                  </th>
                  <th
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      textAlign: "left",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      fontFamily: "var(--font-family-mono)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    size
                  </td>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    48 | 32 | 20 | 16
                  </td>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    32
                  </td>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    Icon container size in pixels
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      fontFamily: "var(--font-family-mono)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    variant
                  </td>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    "plain" | "tile"
                  </td>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    "plain"
                  </td>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    Plain (transparent) or tile (background)
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      fontFamily: "var(--font-family-mono)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    icon
                  </td>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    React.ReactNode
                  </td>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    —
                  </td>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    The icon element (lucide-react or custom)
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      fontFamily: "var(--font-family-mono)",
                      color: "var(--fg-primary)",
                    }}
                  >
                    color
                  </td>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    string
                  </td>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    —
                  </td>
                  <td
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    Custom icon color (overrides default)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}