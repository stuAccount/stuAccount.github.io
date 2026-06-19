import { useState } from "react";
import {
  Github,
  Mail,
  MapPin,
  ExternalLink,
  Star,
  GitFork,
  Code2,
  Flame,
  Zap,
  Cpu,
  Globe,
  Terminal,
  Activity,
  Calendar,
  ArrowRight,
  Coffee,
  Sparkles,
} from "lucide-react";

const neonKeyframes = `
@keyframes glow-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes grid-move {
  0% { transform: translateY(0); }
  100% { transform: translateY(30px); }
}
`;

const CYAN = "#00f0ff";
const PURPLE = "#a855f7";
const GREEN = "#22c55e";
const PINK = "#ec4899";
const BG = "#0a0a0f";
const CARD_BG = "#111118";
const CARD_BORDER = "#1e1e2e";

const techStack = [
  { name: "Java", color: CYAN, glow: "0 0 12px #00f0ff55" },
  { name: "Spring", color: GREEN, glow: "0 0 12px #22c55e55" },
  { name: "Redis", color: PINK, glow: "0 0 12px #ec489955" },
  { name: "MySQL", color: PURPLE, glow: "0 0 12px #a855f755" },
  { name: "Python", color: CYAN, glow: "0 0 12px #00f0ff55" },
  { name: "Docker", color: GREEN, glow: "0 0 12px #22c55e55" },
  { name: "Linux", color: PURPLE, glow: "0 0 12px #a855f755" },
  { name: "Git", color: PINK, glow: "0 0 12px #ec489955" },
  { name: "Vim", color: CYAN, glow: "0 0 12px #00f0ff55" },
  { name: "Nginx", color: GREEN, glow: "0 0 12px #22c55e55" },
];

const stats = [
  {
    icon: Activity,
    label: "Contributions",
    value: "1,247",
    color: CYAN,
    glow: "0 0 20px #00f0ff44, 0 0 40px #00f0ff22",
  },
  {
    icon: Flame,
    label: "Current Streak",
    value: "42 days",
    color: PURPLE,
    glow: "0 0 20px #a855f744, 0 0 40px #a855f722",
  },
  {
    icon: Star,
    label: "Stars Earned",
    value: "312",
    color: GREEN,
    glow: "0 0 20px #22c55e44, 0 0 40px #22c55e22",
  },
  {
    icon: GitFork,
    label: "Repositories",
    value: "38",
    color: PINK,
    glow: "0 0 20px #ec489944, 0 0 40px #ec489922",
  },
];

const recentActivity = [
  {
    action: "Pushed to spring-cloud-gateway-pro",
    desc: "feat: add Redis caching layer to user service",
    time: "2h ago",
    color: CYAN,
  },
  {
    action: "PR merged in distributed-task-scheduler",
    desc: "refactor: migrate payment module to Spring Boot 3",
    time: "1d ago",
    color: PURPLE,
  },
  {
    action: "Released redis-cache-toolkit v2.1.0",
    desc: "Added smart invalidation and Lua scripting support",
    time: "3d ago",
    color: GREEN,
  },
  {
    action: "Fixed critical bug in payment-service",
    desc: "resolve distributed lock race condition",
    time: "5d ago",
    color: PINK,
  },
  {
    action: "Opened PR in leetcode-java-solutions",
    desc: "Added 15 new dynamic programming solutions",
    time: "1w ago",
    color: CYAN,
  },
];

const pinnedRepos = [
  {
    name: "spring-cloud-gateway-pro",
    desc: "Production-ready API gateway with rate limiting & auth",
    stars: 128,
    forks: 34,
    lang: "Java",
    color: CYAN,
  },
  {
    name: "distributed-task-scheduler",
    desc: "Fault-tolerant distributed task scheduling framework",
    stars: 87,
    forks: 21,
    lang: "Java",
    color: PURPLE,
  },
  {
    name: "redis-cache-toolkit",
    desc: "Smart caching utilities with Redis & Spring integration",
    stars: 54,
    forks: 12,
    lang: "Java",
    color: GREEN,
  },
  {
    name: "leetcode-java-solutions",
    desc: "300+ LeetCode solutions with detailed explanations",
    stars: 43,
    forks: 67,
    lang: "Java",
    color: PINK,
  },
];

function NeonCard({ children, color = CYAN, style = {} }) {
  return (
    <div
      style={{
        background: CARD_BG,
        border: `1px solid ${color}33`,
        borderRadius: 12,
        padding: 24,
        boxShadow: `0 0 15px ${color}11, inset 0 1px 0 ${color}11`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ContributionHeatmap() {
  const weeks = 52;
  const days = 7;
  const cells = [];
  const neonColors = ["#0a0a0f", "#00302a", "#00604a", "#00a06a", "#22c55e"];
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < days; d++) {
      const r = Math.random();
      let colorIdx;
      if (r < 0.3) colorIdx = 0;
      else if (r < 0.55) colorIdx = 1;
      else if (r < 0.75) colorIdx = 2;
      else if (r < 0.9) colorIdx = 3;
      else colorIdx = 4;
      week.push(neonColors[colorIdx]);
    }
    cells.push(week);
  }
  return (
    <div style={{ overflowX: "auto", paddingBottom: 4 }}>
      <div style={{ display: "flex", gap: 3 }}>
        {cells.map((week, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {week.map((c, di) => (
              <div
                key={di}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: c,
                  boxShadow: c === "#22c55e" ? "0 0 6px #22c55e66" : "none",
                  border: `1px solid ${c === "#0a0a0f" ? "#1e1e2e" : c}44`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DesignNeonDev() {
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        color: "#e2e8f0",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{neonKeyframes}</style>

      {/* Background grid effect */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(${CYAN}08 1px, transparent 1px),
            linear-gradient(90deg, ${CYAN}08 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Radial glow behind hero */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 400,
          background: `radial-gradient(ellipse, ${PURPLE}15 0%, ${CYAN}08 40%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Top Nav */}
      <div
        style={{
          borderBottom: `1px solid ${CARD_BORDER}`,
          background: `${BG}dd`,
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Github size={22} color={CYAN} />
            <span
              style={{
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: -0.3,
                color: "#e2e8f0",
              }}
            >
              stuAccount
            </span>
            <span
              style={{
                background: `${PURPLE}22`,
                color: PURPLE,
                padding: "2px 10px",
                borderRadius: 12,
                fontSize: 11,
                fontWeight: 600,
                border: `1px solid ${PURPLE}33`,
              }}
            >
              PRO
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Mail size={15} color="#64748b" />
            <ExternalLink size={15} color="#64748b" />
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "60px 24px 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `${GREEN}15`,
              border: `1px solid ${GREEN}33`,
              padding: "6px 16px",
              borderRadius: 20,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: GREEN,
                boxShadow: `0 0 8px ${GREEN}88`,
                animation: "glow-pulse 2s infinite",
              }}
            />
            <span style={{ fontSize: 13, color: GREEN, fontWeight: 500 }}>
              Available for hire
            </span>
          </div>

          <h1
            style={{
              fontSize: 56,
              fontWeight: 900,
              margin: "0 0 12px 0",
              letterSpacing: -2.5,
              lineHeight: 1.05,
              background: `linear-gradient(135deg, ${CYAN}, ${PURPLE}, ${PINK}, ${CYAN})`,
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 6s linear infinite",
            }}
          >
            Jesse Zen
          </h1>

          <p
            style={{
              fontSize: 20,
              color: "#94a3b8",
              fontWeight: 400,
              margin: "0 0 20px 0",
              letterSpacing: -0.3,
            }}
          >
            Java Backend Developer
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              color: "#64748b",
              fontSize: 14,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <MapPin size={14} color={CYAN} /> Earth
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Terminal size={14} color={PURPLE} /> Backend Architecture
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Cpu size={14} color={GREEN} /> AI Integration
            </span>
          </div>

          <div
            style={{
              marginTop: 24,
              padding: "12px 24px",
              background: `${CARD_BG}`,
              border: `1px solid ${CARD_BORDER}`,
              borderRadius: 8,
              display: "inline-block",
            }}
          >
            <span style={{ fontSize: 15, color: "#94a3b8", fontStyle: "italic" }}>
              "Ship beats perfect — learn by building."
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const isHovered = hoveredStat === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
                style={{
                  background: CARD_BG,
                  border: `1px solid ${isHovered ? stat.color + "66" : stat.color + "22"}`,
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  boxShadow: isHovered ? stat.glow : "none",
                  transform: isHovered ? "translateY(-3px)" : "none",
                }}
              >
                <Icon
                  size={20}
                  color={stat.color}
                  style={{
                    marginBottom: 12,
                    filter: `drop-shadow(0 0 6px ${stat.color}66)`,
                  }}
                />
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: stat.color,
                    letterSpacing: -1,
                    lineHeight: 1,
                    textShadow: `0 0 20px ${stat.color}44`,
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#64748b",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Stack - Horizontal Scroll Feel */}
        <NeonCard color={PURPLE} style={{ marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <Zap size={18} color={PURPLE} />
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#e2e8f0",
                letterSpacing: -0.3,
              }}
            >
              Tech Stack
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {techStack.map((tech, i) => (
              <div
                key={i}
                style={{
                  background: `${tech.color}11`,
                  border: `1px solid ${tech.color}33`,
                  borderRadius: 8,
                  padding: "10px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: tech.glow,
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: tech.color,
                    boxShadow: `0 0 6px ${tech.color}88`,
                  }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: tech.color,
                  }}
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </NeonCard>

        {/* Two Column: Contribution Graph + Activity */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 20,
            marginBottom: 32,
          }}
        >
          {/* Contribution Graph */}
          <NeonCard color={GREEN}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <Calendar size={16} color={GREEN} />
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#e2e8f0",
                }}
              >
                Contribution Graph
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "#64748b",
                  marginLeft: "auto",
                }}
              >
                1,247 contributions
              </span>
            </div>
            <ContributionHeatmap />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 4,
                marginTop: 10,
                fontSize: 11,
                color: "#64748b",
              }}
            >
              Less
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: ["#0a0a0f", "#00302a", "#00604a", "#00a06a", "#22c55e"][i],
                    border: "1px solid #1e1e2e44",
                  }}
                />
              ))}
              More
            </div>
          </NeonCard>

          {/* Recent Activity Timeline */}
          <NeonCard color={CYAN}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <Activity size={16} color={CYAN} />
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#e2e8f0",
                }}
              >
                Recent Activity
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    paddingBottom: i < recentActivity.length - 1 ? 16 : 0,
                    position: "relative",
                  }}
                >
                  {/* Timeline */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flexShrink: 0,
                      width: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: item.color,
                        boxShadow: `0 0 8px ${item.color}88`,
                        flexShrink: 0,
                      }}
                    />
                    {i < recentActivity.length - 1 && (
                      <div
                        style={{
                          width: 1,
                          flex: 1,
                          background: `linear-gradient(to bottom, ${item.color}44, ${CARD_BORDER})`,
                          marginTop: 4,
                        }}
                      />
                    )}
                  </div>
                  <div style={{ flex: 1, paddingBottom: 4 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#e2e8f0",
                        marginBottom: 2,
                      }}
                    >
                      {item.action}
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.4 }}>
                      {item.desc}
                    </div>
                    <div style={{ fontSize: 11, color: "#475569", marginTop: 3 }}>
                      {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </NeonCard>
        </div>

        {/* Pinned Repos */}
        <NeonCard color={PINK} style={{ marginBottom: 48 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <Sparkles size={16} color={PINK} />
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#e2e8f0",
                letterSpacing: -0.3,
              }}
            >
              Pinned Repositories
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            {pinnedRepos.map((repo, i) => (
              <div
                key={i}
                style={{
                  background: `${BG}aa`,
                  border: `1px solid ${repo.color}22`,
                  borderRadius: 10,
                  padding: 18,
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <Code2 size={15} color={repo.color} />
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: repo.color,
                    }}
                  >
                    {repo.name}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#64748b",
                    lineHeight: 1.5,
                    marginBottom: 12,
                  }}
                >
                  {repo.desc}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    fontSize: 12,
                    color: "#64748b",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: repo.color,
                        display: "inline-block",
                      }}
                    />
                    {repo.lang}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Star size={12} /> {repo.stars}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <GitFork size={12} /> {repo.forks}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </NeonCard>

        {/* Interests */}
        <NeonCard color={CYAN} style={{ marginBottom: 48 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <Globe size={16} color={CYAN} />
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#e2e8f0",
                letterSpacing: -0.3,
              }}
            >
              Interests & Focus Areas
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
            }}
          >
            {[
              { name: "Backend Architecture", icon: Cpu, color: CYAN },
              { name: "AI Integration", icon: Sparkles, color: PURPLE },
              { name: "Distributed Systems", icon: Globe, color: GREEN },
              { name: "LeetCode", icon: Code2, color: PINK },
              { name: "Vim", icon: Terminal, color: CYAN },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    padding: 16,
                    background: `${item.color}08`,
                    border: `1px solid ${item.color}22`,
                    borderRadius: 10,
                  }}
                >
                  <Icon
                    size={22}
                    color={item.color}
                    style={{
                      marginBottom: 8,
                      filter: `drop-shadow(0 0 6px ${item.color}55)`,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: item.color,
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              );
            })}
          </div>
        </NeonCard>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            paddingTop: 32,
            borderTop: `1px solid ${CARD_BORDER}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Coffee size={14} color={PURPLE} />
            <span style={{ fontSize: 13, color: "#64748b" }}>
              Crafted with care & late-night coffee
            </span>
          </div>
          <div style={{ fontSize: 12, color: "#475569" }}>
            stuAccount @ GitHub — {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
