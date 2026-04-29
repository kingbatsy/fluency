import { useState } from “react”;

const days = [
{
day: “MON”,
label: “Baseline Day”,
color: “#E8D5B7”,
tasks: [
{ id: “m1”, text: “Said work plan out loud (morning)” },
{ id: “m2”, text: “Recorded 2-min self-introduction” },
{ id: “m3”, text: “Listened back & noted pace/fillers/blanks” },
{ id: “m4”, text: “Wrote 1 observation (evening)” },
],
reflection: “What did you notice about yourself?”,
},
{
day: “TUE”,
label: “Slow Down Day”,
color: “#B7D5E8”,
tasks: [
{ id: “t1”, text: “Said work plan slower than yesterday” },
{ id: “t2”, text: “Read article aloud for 5 min” },
{ id: “t3”, text: “Recorded 2-min topic of choice” },
{ id: “t4”, text: “Checked: did I speak slower? (evening)” },
],
reflection: “Did slowing down feel uncomfortable?”,
},
{
day: “WED”,
label: “Filler Awareness Day”,
color: “#D5E8B7”,
tasks: [
{ id: “w1”, text: “Counted fillers in morning plan” },
{ id: “w2”, text: “Read aloud for 5 min” },
{ id: “w3”, text: ‘Recorded 2-min on “good speaking experience”’ },
{ id: “w4”, text: “Counted total fillers in recording” },
],
reflection: “How many fillers did you count?”,
},
{
day: “THU”,
label: “Structure Day”,
color: “#E8B7D5”,
tasks: [
{ id: “th1”, text: ‘Said plan using “3 things — first, second, third”’ },
{ id: “th2”, text: “Read aloud for 5 min” },
{ id: “th3”, text: ‘Recorded 2-min on “3 challenges I face”’ },
{ id: “th4”, text: ‘Used “There are two things here…” in real life’ },
],
reflection: “Did structure reduce mid-sentence confusion?”,
},
{
day: “FRI”,
label: “Recovery Day”,
color: “#E8E0B7”,
tasks: [
{ id: “f1”, text: “Said morning plan out loud” },
{ id: “f2”, text: “Spoke 90 sec on random topic unprepared” },
{ id: “f3”, text: ‘Used “what I mean is…” or “let me think…” when blank’ },
{ id: “f4”, text: “Noted: recovery felt easier than Monday?” },
],
reflection: “How did you recover from blanking?”,
},
{
day: “SAT”,
label: “Easy Day”,
color: “#C8B7E8”,
tasks: [
{ id: “s1”, text: “Watched a confident speaker (podcast/TED/YouTube)” },
{ id: “s2”, text: “Noticed their pace, pauses, word-finding” },
{ id: “s3”, text: “Shadowed them for 2 min (optional)” },
],
reflection: “What did you notice about their style?”,
},
{
day: “SUN”,
label: “Reflection Day”,
color: “#B7E8D5”,
tasks: [
{ id: “su1”, text: “Listened to Monday vs Friday recording” },
{ id: “su2”, text: “Noted what changed” },
{ id: “su3”, text: “Wrote 1 win, 1 struggle, 1 focus for Week 2” },
],
reflection: “What’s your Week 2 focus?”,
},
];

export default function FluencyTracker() {
const [checked, setChecked] = useState({});
const [notes, setNotes] = useState({});
const [activeDay, setActiveDay] = useState(0);

const toggle = (id) => setChecked((p) => ({ …p, [id]: !p[id] }));

const totalTasks = days.reduce((a, d) => a + d.tasks.length, 0);
const completedTasks = Object.values(checked).filter(Boolean).length;
const progress = Math.round((completedTasks / totalTasks) * 100);

const dayComplete = (d) => d.tasks.every((t) => checked[t.id]);

return (
<div style={{
minHeight: “100vh”,
background: “#0F0F0F”,
fontFamily: “‘Georgia’, ‘Times New Roman’, serif”,
color: “#F0EDE6”,
padding: “0”,
}}>
{/* Header */}
<div style={{
borderBottom: “1px solid #2A2A2A”,
padding: “32px 40px 24px”,
display: “flex”,
alignItems: “flex-end”,
justifyContent: “space-between”,
flexWrap: “wrap”,
gap: “16px”,
}}>
<div>
<div style={{ fontSize: “11px”, letterSpacing: “4px”, color: “#888”, marginBottom: “8px”, textTransform: “uppercase” }}>
90-Day Fluency Program
</div>
<h1 style={{ fontSize: “clamp(28px, 5vw, 42px)”, fontWeight: “normal”, margin: 0, letterSpacing: “-1px” }}>
Week 1 Tracker
</h1>
</div>
<div style={{ textAlign: “right” }}>
<div style={{ fontSize: “11px”, letterSpacing: “3px”, color: “#888”, marginBottom: “6px”, textTransform: “uppercase” }}>Overall Progress</div>
<div style={{ fontSize: “clamp(32px, 6vw, 52px)”, fontWeight: “normal”, lineHeight: 1, color: “#F0EDE6” }}>
{progress}<span style={{ fontSize: “20px”, color: “#888” }}>%</span>
</div>
<div style={{ marginTop: “8px”, width: “160px”, height: “2px”, background: “#2A2A2A”, marginLeft: “auto” }}>
<div style={{ height: “100%”, width: `${progress}%`, background: “#F0EDE6”, transition: “width 0.5s ease” }} />
</div>
</div>
</div>

```
  {/* Day Tabs */}
  <div style={{
    display: "flex",
    overflowX: "auto",
    borderBottom: "1px solid #2A2A2A",
    padding: "0 40px",
    scrollbarWidth: "none",
  }}>
    {days.map((d, i) => (
      <button
        key={d.day}
        onClick={() => setActiveDay(i)}
        style={{
          background: "none",
          border: "none",
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          borderBottom: activeDay === i ? `2px solid ${d.color}` : "2px solid transparent",
          marginBottom: "-1px",
          transition: "all 0.2s",
          flexShrink: 0,
        }}
      >
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: dayComplete(d) ? d.color : activeDay === i ? "#2A2A2A" : "transparent",
          border: `1px solid ${dayComplete(d) ? d.color : "#444"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "10px", color: dayComplete(d) ? "#0F0F0F" : "#888",
          fontFamily: "monospace", letterSpacing: "0px",
          transition: "all 0.3s",
        }}>
          {dayComplete(d) ? "✓" : i + 1}
        </div>
        <span style={{
          fontSize: "10px", letterSpacing: "2px",
          color: activeDay === i ? d.color : "#555",
          textTransform: "uppercase",
          transition: "color 0.2s",
        }}>{d.day}</span>
      </button>
    ))}
  </div>

  {/* Active Day Content */}
  {(() => {
    const d = days[activeDay];
    const done = d.tasks.filter((t) => checked[t.id]).length;
    return (
      <div style={{ padding: "40px", maxWidth: "720px" }}>
        {/* Day header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
            <div style={{
              display: "inline-block",
              background: d.color,
              color: "#0F0F0F",
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: "2px",
            }}>{d.day}</div>
            <div style={{ fontSize: "11px", color: "#666", letterSpacing: "1px" }}>
              {done}/{d.tasks.length} complete
            </div>
          </div>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: "normal", margin: 0, letterSpacing: "-0.5px" }}>
            {d.label}
          </h2>
        </div>

        {/* Tasks */}
        <div style={{ marginBottom: "36px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#666", textTransform: "uppercase", marginBottom: "16px" }}>
            Daily Drills
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {d.tasks.map((t) => (
              <div
                key={t.id}
                onClick={() => toggle(t.id)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  padding: "16px 20px",
                  background: checked[t.id] ? "#1A1A1A" : "transparent",
                  border: `1px solid ${checked[t.id] ? "#2A2A2A" : "#1E1E1E"}`,
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div style={{
                  width: "20px", height: "20px", borderRadius: "3px", flexShrink: 0,
                  border: `1.5px solid ${checked[t.id] ? d.color : "#444"}`,
                  background: checked[t.id] ? d.color : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: "2px", transition: "all 0.2s",
                }}>
                  {checked[t.id] && <span style={{ color: "#0F0F0F", fontSize: "12px", lineHeight: 1 }}>✓</span>}
                </div>
                <span style={{
                  fontSize: "15px",
                  color: checked[t.id] ? "#555" : "#C8C4BC",
                  textDecoration: checked[t.id] ? "line-through" : "none",
                  lineHeight: "1.5",
                  transition: "all 0.2s",
                }}>{t.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reflection */}
        <div>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#666", textTransform: "uppercase", marginBottom: "12px" }}>
            Evening Reflection
          </div>
          <div style={{
            fontSize: "14px", color: "#888", marginBottom: "12px",
            fontStyle: "italic", lineHeight: "1.6",
          }}>
            {d.reflection}
          </div>
          <textarea
            value={notes[d.day] || ""}
            onChange={(e) => setNotes((p) => ({ ...p, [d.day]: e.target.value }))}
            placeholder="Write your reflection here..."
            style={{
              width: "100%",
              minHeight: "100px",
              background: "#1A1A1A",
              border: "1px solid #2A2A2A",
              borderRadius: "4px",
              color: "#C8C4BC",
              fontSize: "14px",
              padding: "16px",
              resize: "vertical",
              fontFamily: "Georgia, serif",
              lineHeight: "1.6",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Nav */}
        <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
          {activeDay > 0 && (
            <button onClick={() => setActiveDay(activeDay - 1)} style={{
              background: "transparent", border: "1px solid #2A2A2A", color: "#888",
              padding: "10px 24px", fontSize: "12px", letterSpacing: "2px",
              textTransform: "uppercase", cursor: "pointer", borderRadius: "2px",
              transition: "all 0.2s",
            }}>← Previous</button>
          )}
          {activeDay < days.length - 1 && (
            <button onClick={() => setActiveDay(activeDay + 1)} style={{
              background: d.color, border: "none", color: "#0F0F0F",
              padding: "10px 24px", fontSize: "12px", letterSpacing: "2px",
              textTransform: "uppercase", cursor: "pointer", borderRadius: "2px",
              transition: "all 0.2s",
            }}>Next Day →</button>
          )}
        </div>
      </div>
    );
  })()}

  {/* Week summary strip */}
  <div style={{
    position: "fixed", bottom: 0, left: 0, right: 0,
    background: "#0A0A0A", borderTop: "1px solid #1E1E1E",
    padding: "12px 40px",
    display: "flex", gap: "8px", alignItems: "center",
    overflowX: "auto",
  }}>
    <span style={{ fontSize: "10px", letterSpacing: "2px", color: "#555", textTransform: "uppercase", flexShrink: 0, marginRight: "8px" }}>
      Week
    </span>
    {days.map((d, i) => (
      <div
        key={d.day}
        onClick={() => setActiveDay(i)}
        title={d.label}
        style={{
          width: "28px", height: "6px", borderRadius: "3px",
          background: dayComplete(d) ? d.color : activeDay === i ? "#333" : "#1E1E1E",
          cursor: "pointer",
          transition: "all 0.3s",
          flexShrink: 0,
        }}
      />
    ))}
    <span style={{ fontSize: "10px", color: "#444", marginLeft: "8px", flexShrink: 0 }}>
      {completedTasks}/{totalTasks} tasks
    </span>
  </div>

  <div style={{ height: "60px" }} />
</div>
```

);
}
