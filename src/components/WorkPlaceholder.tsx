import "./styles/WorkPlaceholder.css";

type Props = {
  index: number;
};

const WorkPlaceholder = ({ index }: Props) => {
  if (index === 0) return <SplitwisePlaceholder />;
  if (index === 1) return <ExpensePlaceholder />;
  return <FlappyPlaceholder />;
};

/* ── 1. Splitwise Clone ── */
const SplitwisePlaceholder = () => {
  const items = [
    { label: "Team Dinner",  amount: "−₹1,400", pos: false },
    { label: "Uber Ride",    amount: "+₹800",   pos: true  },
    { label: "Movie Night",  amount: "−₹600",   pos: false },
    { label: "Groceries",    amount: "−₹1,200", pos: false },
  ];
  return (
    <div className="wp-card wp-splitwise">
      <div className="wp-header">
        <span>💸</span>
        <span>Group Balance</span>
      </div>
      <div className="wp-balance">₹ 4,200</div>
      <div className="wp-users">
        <div className="wp-avatar">You</div>
        <div className="wp-arrow">→</div>
        <div className="wp-avatar">Group</div>
      </div>
      <div className="wp-list">
        {items.map((item, i) => (
          <div
            key={i}
            className="wp-item"
            style={{ animationDelay: `${i * 0.28}s` }}
          >
            <span className="wp-check">✓</span>
            <span className="wp-item-label">{item.label}</span>
            <span className={`wp-item-amount ${item.pos ? "wp-pos" : "wp-neg"}`}>
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── 2. Expense Manager ── */
const ExpensePlaceholder = () => {
  const bars: { h: string; delay: string }[] = [
    { h: "55%",  delay: "0s"     },
    { h: "78%",  delay: "0.12s"  },
    { h: "42%",  delay: "0.24s"  },
    { h: "90%",  delay: "0.36s"  },
    { h: "61%",  delay: "0.48s"  },
    { h: "74%",  delay: "0.60s"  },
  ];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const cats = ["Food", "Transport", "Shopping", "Bills", "Health"];

  return (
    <div className="wp-card wp-expense">
      <div className="wp-header">
        <span>📊</span>
        <span>Monthly Expenses</span>
      </div>
      <div className="wp-chart">
        {bars.map((b, i) => (
          <div className="wp-bar-wrap" key={i}>
            <div
              className="wp-bar"
              style={
                {
                  "--bar-h": b.h,
                  animationDelay: b.delay,
                } as React.CSSProperties
              }
            />
            <span className="wp-month">{months[i]}</span>
          </div>
        ))}
      </div>
      <div className="wp-total">
        Total: ₹42,680 &nbsp;<span className="wp-pos">↓ 8%</span>
      </div>
      <div className="wp-categories">
        {cats.map((c, i) => (
          <div
            key={i}
            className="wp-cat"
            style={{ animationDelay: `${0.6 + i * 0.1}s` }}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── 3. Flappy Bird ── */
const FlappyPlaceholder = () => (
  <div className="wp-card wp-flappy">
    {/* Sky background layer */}
    <div className="wp-sky">
      {/* Clouds */}
      <div className="wp-cloud" style={{ top: "10%", animationDelay: "0s",  animationDuration: "9s"  }} />
      <div className="wp-cloud" style={{ top: "28%", animationDelay: "-4s", animationDuration: "13s" }} />

      {/* Pipe 1 — top half */}
      <div className="wp-p1-top">
        <div className="wp-p-cap" />
        <div className="wp-p-shaft wp-p-shaft-top" />
      </div>
      {/* Pipe 1 — bottom half */}
      <div className="wp-p1-bot">
        <div className="wp-p-shaft wp-p-shaft-bot" />
        <div className="wp-p-cap" />
      </div>

      {/* Pipe 2 — top half */}
      <div className="wp-p2-top">
        <div className="wp-p-cap" />
        <div className="wp-p-shaft wp-p-shaft-top" style={{ height: 60 }} />
      </div>
      {/* Pipe 2 — bottom half */}
      <div className="wp-p2-bot">
        <div className="wp-p-shaft wp-p-shaft-bot" style={{ height: 80 }} />
        <div className="wp-p-cap" />
      </div>

      {/* Bird */}
      <div className="wp-bird-wrap">
        <div className="wp-bird-body">
          <div className="wp-bird-eye" />
          <div className="wp-bird-beak" />
          <div className="wp-bird-wing" />
        </div>
      </div>

      <div className="wp-score">
        SCORE &nbsp;<span className="wp-score-val">12</span>
      </div>
      <div className="wp-ground" />
    </div>
  </div>
);

export default WorkPlaceholder;