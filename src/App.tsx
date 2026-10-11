import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Bell,
  Building2,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Droplets,
  Home,
  Lightbulb,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  ThumbsUp,
  UserRound,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type Role = "Student" | "Teacher" | "Warden" | "Worker";
type Tab = "Home" | "Feed" | "Report" | "Alerts" | "Profile";
type Issue = {
  id: number;
  title: string;
  category: string;
  location: string;
  status: "Reported" | "Assigned" | "In Progress" | "Fixed" | "Verified";
  priority: "Low" | "Medium" | "Urgent";
  time: string;
  votes: number;
  comments: number;
  image: string;
  reporter: string;
  color: string;
};

const campusPhoto =
  "https://images.unsplash.com/photo-1742950979937-8a2693b51cd2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200";

const seedIssues: Issue[] = [
  {
    id: 1,
    title: "Water leaking near the washroom",
    category: "Plumbing",
    location: "Maple Hall · Floor 2",
    status: "In Progress",
    priority: "Urgent",
    time: "12 min ago",
    votes: 18,
    comments: 4,
    image: "water",
    reporter: "Maya Chen",
    color: "bg-blue-100 dark:bg-blue-950",
  },
  {
    id: 2,
    title: "Corridor light keeps flickering",
    category: "Electrical",
    location: "Science Block · Floor 1",
    status: "Assigned",
    priority: "Medium",
    time: "1 hr ago",
    votes: 9,
    comments: 2,
    image: "light",
    reporter: "Noah Williams",
    color: "bg-amber-100 dark:bg-amber-950",
  },
  {
    id: 3,
    title: "Broken study chair in room 304",
    category: "Furniture",
    location: "Cedar Hostel · Room 304",
    status: "Reported",
    priority: "Low",
    time: "3 hr ago",
    votes: 6,
    comments: 1,
    image: "chair",
    reporter: "Ishaan Mehta",
    color: "bg-violet-100 dark:bg-violet-950",
  },
  {
    id: 4,
    title: "Wi-Fi drops every few minutes",
    category: "Internet",
    location: "Central Library · Floor 3",
    status: "Fixed",
    priority: "Medium",
    time: "Yesterday",
    votes: 22,
    comments: 7,
    image: "wifi",
    reporter: "Ava Patel",
    color: "bg-emerald-100 dark:bg-emerald-950",
  },
];

const iconForCategory = (category: string, size = 20) => {
  if (category === "Plumbing") return <Droplets size={size} />;
  if (category === "Electrical") return <Lightbulb size={size} />;
  if (category === "Internet") return <Zap size={size} />;
  return <Wrench size={size} />;
};

function StatusPill({ status }: { status: Issue["status"] }) {
  const tone =
    status === "Fixed" || status === "Verified"
      ? "status-green"
      : status === "In Progress"
        ? "status-orange"
        : "status-blue";
  return <span className={`status-pill ${tone}`}>{status}</span>;
}

function PageHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
      </div>
      {action}
    </header>
  );
}

function IssueCard({
  issue,
  onOpen,
  onVote,
  voted,
}: {
  issue: Issue;
  onOpen: () => void;
  onVote: () => void;
  voted?: boolean;
}) {
  return (
    <motion.article
      layout
      whileTap={{ scale: 0.99 }}
      className="issue-card"
      onClick={onOpen}
    >
      <div className={`issue-thumb ${issue.color}`}>
        {iconForCategory(issue.category, 28)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-start justify-between gap-2">
          <StatusPill status={issue.status} />
          <span className="text-xs text-secondary">{issue.time}</span>
        </div>
        <h3 className="issue-title">{issue.title}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-secondary">
          <Building2 size={14} />
          {issue.location}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <button
            className={`social-button ${voted ? "is-active" : ""}`}
            onClick={(event) => {
              event.stopPropagation();
              onVote();
            }}
            aria-label={`Me too, ${issue.votes + (voted ? 1 : 0)} votes`}
          >
            <ThumbsUp size={16} />
            Me too · {issue.votes + (voted ? 1 : 0)}
          </button>
          <button className="social-button" aria-label={`${issue.comments} comments`}>
            <MessageCircle size={16} />
            {issue.comments}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function StudentHome({
  setTab,
  openIssue,
  votes,
  toggleVote,
}: {
  setTab: (tab: Tab) => void;
  openIssue: (issue: Issue) => void;
  votes: Set<number>;
  toggleVote: (id: number) => void;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Tuesday, 14 May"
        title="Good morning, Maya"
        action={
          <button className="avatar-button" aria-label="Profile" onClick={() => setTab("Profile")}>
            MC
          </button>
        }
      />
      <section className="hero-card">
        <div className="relative z-10 max-w-sm">
          <span className="hero-kicker">
            <Sparkles size={14} /> Campus care
          </span>
          <h2>Spot something that needs fixing?</h2>
          <p>Tell us in under 30 seconds. We’ll take it from there.</p>
          <button className="primary-button mt-5" onClick={() => setTab("Report")}>
            <Plus size={20} strokeWidth={2.5} />
            Report an issue
          </button>
        </div>
        <img src={campusPhoto} alt="Sunlit university hallway" />
      </section>

      <section className="mt-8">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your reports</p>
            <h2>On the move</h2>
          </div>
          <button className="text-button" onClick={() => setTab("Feed")}>
            View all <ChevronRight size={16} />
          </button>
        </div>
        <div className="progress-card">
          <div className="flex items-start gap-4">
            <div className="icon-tile bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
              <Droplets size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <StatusPill status="In Progress" />
                <span className="text-xs text-secondary">#FG-2048</span>
              </div>
              <h3 className="mt-3 font-semibold">Leaking tap in room 217</h3>
              <p className="mt-1 text-sm text-secondary">Maple Hall · Assigned to Jordan</p>
            </div>
          </div>
          <div className="timeline-mini" aria-label="Issue progress">
            {["Reported", "Assigned", "In progress", "Fixed"].map((step, index) => (
              <div key={step} className={index < 3 ? "complete" : ""}>
                <span />
                <small>{step}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Around you</p>
            <h2>Campus updates</h2>
          </div>
          <button className="text-button" onClick={() => setTab("Feed")}>
            Explore <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {seedIssues.slice(0, 2).map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onOpen={() => openIssue(issue)}
              voted={votes.has(issue.id)}
              onVote={() => toggleVote(issue.id)}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function WardenHome({ openIssue }: { openIssue: (issue: Issue) => void }) {
  return (
    <>
      <PageHeader
        eyebrow="Campus overview"
        title="Good morning, Priya"
        action={<button className="avatar-button">PS</button>}
      />
      <div className="metric-grid">
        {[
          ["Open", "24", "3 new", "blue"],
          ["In progress", "8", "2 urgent", "orange"],
          ["Resolved today", "12", "+18%", "green"],
        ].map(([label, value, detail, tone]) => (
          <article className="metric-card" key={label}>
            <span className={`metric-dot ${tone}`} />
            <p>{label}</p>
            <strong>{value}</strong>
            <small>{detail}</small>
          </article>
        ))}
      </div>
      <section className="mt-8">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Needs attention</p>
            <h2>Priority queue</h2>
          </div>
          <button className="filter-button">
            <SlidersHorizontal size={17} /> Filters
          </button>
        </div>
        <div className="segmented">
          <button className="active">All 24</button>
          <button>Urgent 3</button>
          <button>Unassigned 7</button>
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {seedIssues.slice(0, 3).map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onOpen={() => openIssue(issue)}
              onVote={() => {}}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function WorkerHome({ openIssue }: { openIssue: (issue: Issue) => void }) {
  return (
    <>
      <PageHeader
        eyebrow="Tuesday, 14 May"
        title="Your tasks"
        action={<button className="avatar-button">JD</button>}
      />
      <div className="worker-summary">
        <div>
          <p>Today’s progress</p>
          <strong>3 of 5 tasks</strong>
        </div>
        <div className="progress-ring">60%</div>
      </div>
      <div className="section-heading mt-8">
        <div>
          <p className="eyebrow">Up next</p>
          <h2>Assigned to you</h2>
        </div>
        <span className="status-pill status-orange">2 urgent</span>
      </div>
      <div className="grid gap-3">
        {seedIssues.slice(0, 3).map((issue, index) => (
          <motion.button
            whileTap={{ scale: 0.99 }}
            className="task-row"
            key={issue.id}
            onClick={() => openIssue(issue)}
          >
            <span className={`priority-bar ${index === 0 ? "urgent" : "medium"}`} />
            <span className={`icon-tile ${issue.color}`}>{iconForCategory(issue.category)}</span>
            <span className="min-w-0 flex-1 text-left">
              <small>{index === 0 ? "URGENT · " : ""}{issue.category}</small>
              <strong>{issue.title}</strong>
              <span>{issue.location}</span>
            </span>
            <ChevronRight size={18} className="text-tertiary" />
          </motion.button>
        ))}
      </div>
    </>
  );
}

function Feed({
  openIssue,
  votes,
  toggleVote,
}: {
  openIssue: (issue: Issue) => void;
  votes: Set<number>;
  toggleVote: (id: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Open");
  const filtered = useMemo(
    () =>
      seedIssues.filter(
        (issue) =>
          issue.title.toLowerCase().includes(query.toLowerCase()) ||
          issue.location.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );
  return (
    <>
      <PageHeader title="Community feed" />
      <label className="search-box">
        <Search size={19} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search issues or locations"
          aria-label="Search issues or locations"
        />
        <button aria-label="Filter"><SlidersHorizontal size={18} /></button>
      </label>
      <div className="segmented mt-4">
        {["Open", "Nearby", "Resolved"].map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {filtered.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onOpen={() => openIssue(issue)}
            voted={votes.has(issue.id)}
            onVote={() => toggleVote(issue.id)}
          />
        ))}
      </div>
    </>
  );
}

function Alerts() {
  const alerts = [
    ["Your issue is being fixed", "Jordan started work on the leaking tap in Maple Hall.", "2 min", "tool"],
    ["Task assigned", "Corridor light in Science Block was assigned to Alex.", "1 hr", "user"],
    ["Thanks for helping", "18 students also reported the washroom leak.", "3 hr", "vote"],
    ["Issue verified", "Wi-Fi in Central Library has been marked as resolved.", "Yesterday", "check"],
  ];
  return (
    <>
      <PageHeader title="Notifications" action={<button className="text-button">Mark all read</button>} />
      <div className="grouped-list">
        {alerts.map(([title, body, time, kind], index) => (
          <article className="notification-row" key={title}>
            <div className={`notification-icon ${index < 2 ? "unread" : ""}`}>
              {kind === "tool" ? <Wrench /> : kind === "check" ? <Check /> : kind === "vote" ? <ThumbsUp /> : <UserRound />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between gap-3">
                <h3>{title}</h3>
                <time>{time}</time>
              </div>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Profile({
  role,
  setRole,
  onSignOut,
}: {
  role: Role;
  setRole: (role: Role) => void;
  onSignOut: () => void;
}) {
  return (
    <>
      <PageHeader title="Profile" />
      <div className="profile-card">
        <div className="profile-avatar">MC</div>
        <h2>Maya Chen</h2>
        <p>maya.chen@northbridge.edu</p>
        <span>{role}</span>
      </div>
      <section className="mt-8">
        <p className="settings-label">PREVIEW ROLE</p>
        <div className="grouped-list role-picker">
          {(["Student", "Teacher", "Warden", "Worker"] as Role[]).map((item) => (
            <button key={item} onClick={() => setRole(item)}>
              <span className="settings-icon"><Users size={18} /></span>
              <span>{item}</span>
              {role === item ? <Check size={19} className="text-accent" /> : <ChevronRight size={18} className="text-tertiary" />}
            </button>
          ))}
        </div>
      </section>
      <section className="mt-7">
        <p className="settings-label">SETTINGS</p>
        <div className="grouped-list role-picker">
          {["Notification preferences", "Appearance", "Help & support"].map((item) => (
            <button key={item}>
              <span>{item}</span>
              <ChevronRight size={18} className="text-tertiary" />
            </button>
          ))}
        </div>
      </section>
      <button className="signout-button" onClick={onSignOut}>Sign out</button>
      <p className="mt-6 text-center text-xs text-tertiary">FixGenie 1.0 · Northbridge Campus</p>
    </>
  );
}

function Login({ onLogin }: { onLogin: (role: Role) => void }) {
  const [signup, setSignup] = useState(false);
  const [role, setRole] = useState<Role>("Student");
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-brand"><span><Wrench /></span>FixGenie</div>
        <div className="auth-heading">
          <p className="eyebrow">{signup ? "Join your campus" : "Welcome back"}</p>
          <h1>{signup ? "Create your account" : "Good to see you"}</h1>
          <p>{signup ? "Report problems and help make campus better." : "Sign in to track reports and campus updates."}</p>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); onLogin(role); }}>
          <label>Email address<input type="email" defaultValue="maya.chen@northbridge.edu" required /></label>
          <label>Password<input type="password" defaultValue="fixgenie" required /></label>
          {signup && (
            <div>
              <span className="field-label">I am a…</span>
              <div className="segmented">
                {(["Student", "Teacher", "Warden", "Worker"] as Role[]).map((item) => (
                  <button type="button" key={item} className={role === item ? "active" : ""} onClick={() => setRole(item)}>{item}</button>
                ))}
              </div>
              {role === "Warden" && <p className="approval-note"><Clock3 size={15} /> Warden accounts require admin approval.</p>}
            </div>
          )}
          <button className="primary-button w-full justify-center" type="submit">{signup ? "Create account" : "Sign in"}</button>
        </form>
        <button className="auth-switch" onClick={() => setSignup(!signup)}>
          {signup ? "Already have an account? Sign in" : "New to FixGenie? Create an account"}
        </button>
        <p className="auth-security">Secure access for Northbridge Campus</p>
      </section>
      <aside className="auth-visual">
        <img src={campusPhoto} alt="Northbridge campus hallway" />
        <div><Sparkles /><h2>Small reports.<br />Better campus.</h2><p>From a dripping tap to a broken chair, help is always a few taps away.</p></div>
      </aside>
    </main>
  );
}

function ReportSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("Plumbing");
  const [urgent, setUrgent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const categories = ["Plumbing", "Electrical", "Furniture", "Cleaning", "Internet", "Other"];
  const reset = () => {
    setStep(1);
    setSubmitted(false);
    onClose();
  };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={reset}
          />
          <motion.section
            className="bottom-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            aria-modal="true"
            role="dialog"
          >
            <div className="sheet-handle" />
            <div className="sheet-header">
              <button onClick={reset} aria-label="Close"><X /></button>
              <h2>{submitted ? "Report sent" : "Report an issue"}</h2>
              <span>{!submitted && `${step}/2`}</span>
            </div>
            {submitted ? (
              <div className="success-state">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="success-check">
                  <Check size={34} />
                </motion.div>
                <h3>Help is on the way</h3>
                <p>Your report <strong>#FG-2051</strong> has been sent to the campus team.</p>
                <button className="primary-button w-full justify-center" onClick={reset}>Done</button>
              </div>
            ) : step === 1 ? (
              <div className="sheet-content">
                <div>
                  <label className="field-label">What needs fixing?</label>
                  <div className="category-grid">
                    {categories.map((item) => (
                      <button
                        key={item}
                        className={category === item ? "selected" : ""}
                        onClick={() => setCategory(item)}
                      >
                        {iconForCategory(item)}
                        <span>{item}</span>
                        {category === item && <Check size={14} className="category-check" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="field-label">Where is it?</label>
                  <div className="location-fields">
                    {["Maple Hall", "Floor 2", "Room 217"].map((value) => (
                      <button key={value}>{value}<ChevronDown size={16} /></button>
                    ))}
                  </div>
                </div>
                <button className="primary-button w-full justify-center" onClick={() => setStep(2)}>
                  Continue <ChevronRight size={18} />
                </button>
              </div>
            ) : (
              <div className="sheet-content">
                <button className="photo-upload">
                  <span><Camera size={25} /></span>
                  <strong>Add a photo</strong>
                  <small>Helps us fix it faster</small>
                </button>
                <label className="field-label" htmlFor="description">Briefly describe the problem</label>
                <textarea id="description" placeholder="e.g. The tap won't stop dripping…" maxLength={180} />
                <div className="toggle-row">
                  <span className="icon-tile bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300"><AlertCircle /></span>
                  <span className="flex-1">
                    <strong>Needs urgent attention</strong>
                    <small>Safety risk or major disruption</small>
                  </span>
                  <button
                    className={`toggle ${urgent ? "on" : ""}`}
                    onClick={() => setUrgent(!urgent)}
                    role="switch"
                    aria-checked={urgent}
                  ><span /></button>
                </div>
                <div className="flex gap-3">
                  <button className="secondary-button" onClick={() => setStep(1)}>Back</button>
                  <button className="primary-button flex-1 justify-center" onClick={() => setSubmitted(true)}>
                    Send report
                  </button>
                </div>
              </div>
            )}
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}

function IssueDetail({ issue, onClose }: { issue: Issue | null; onClose: () => void }) {
  if (!issue) return null;
  const steps = ["Reported", "Assigned", "In Progress", "Fixed", "Verified"];
  const current = steps.indexOf(issue.status);
  return (
    <motion.div className="detail-page" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}>
      <div className="detail-nav">
        <button onClick={onClose} aria-label="Go back"><ChevronLeft /></button>
        <span>Issue #{2047 + issue.id}</span>
        <button aria-label="More"><MoreHorizontal /></button>
      </div>
      <main className="detail-content">
        <div className={`detail-photo ${issue.color}`}>
          {iconForCategory(issue.category, 62)}
          <span>Photo attached by {issue.reporter}</span>
        </div>
        <StatusPill status={issue.status} />
        <h1>{issue.title}</h1>
        <p className="detail-location"><Building2 size={17} /> {issue.location}</p>
        <div className="detail-meta">
          <div><CircleUserRound /><span>Reported by<strong>{issue.reporter}</strong></span></div>
          <div><Clock3 /><span>Reported<strong>{issue.time}</strong></span></div>
        </div>
        <section className="detail-section">
          <p className="eyebrow">Progress</p>
          <h2>Status timeline</h2>
          <div className="full-timeline">
            {steps.map((step, index) => (
              <div className={index <= current ? "complete" : ""} key={step}>
                <span>{index < current ? <Check size={13} /> : null}</span>
                <div><strong>{step}</strong><small>{index <= current ? (index === current ? "Current status" : "Completed") : "Pending"}</small></div>
              </div>
            ))}
          </div>
        </section>
        <section className="detail-section">
          <div className="section-heading">
            <div><p className="eyebrow">Community</p><h2>{issue.comments} comments</h2></div>
          </div>
          <div className="comment">
            <span>NW</span>
            <div><strong>Noah Williams</strong><small>35 min ago</small><p>I noticed this too. It’s getting slippery near the entrance.</p></div>
          </div>
          <button className="comment-box">Add a comment… <MessageCircle size={18} /></button>
        </section>
      </main>
    </motion.div>
  );
}

function Navigation({
  tab,
  setTab,
  role,
}: {
  tab: Tab;
  setTab: (tab: Tab) => void;
  role: Role;
}) {
  const items: { label: Tab; icon: React.ReactNode }[] = [
    { label: "Home", icon: <Home /> },
    { label: "Feed", icon: <Users /> },
    { label: "Report", icon: <Plus /> },
    { label: "Alerts", icon: <Bell /> },
    { label: "Profile", icon: <CircleUserRound /> },
  ];
  return (
    <>
      <aside className="desktop-sidebar">
        <div className="brand"><span><Wrench /></span><strong>FixGenie</strong></div>
        <nav>
          {items.map((item) => (
            <button
              key={item.label}
              className={tab === item.label ? "active" : ""}
              onClick={() => setTab(item.label)}
            >
              {item.icon}<span>{item.label}</span>
              {item.label === "Alerts" && <i>3</i>}
            </button>
          ))}
        </nav>
        <div className="sidebar-role"><span>{role.slice(0, 1)}</span><div><strong>Maya Chen</strong><small>{role}</small></div></div>
      </aside>
      <nav className="bottom-nav">
        {items.map((item) =>
          item.label === "Report" ? (
            <button key={item.label} className="report-tab" onClick={() => setTab("Report")} aria-label="Report issue">
              <Plus />
            </button>
          ) : (
            <button
              key={item.label}
              className={tab === item.label ? "active" : ""}
              onClick={() => setTab(item.label)}
            >
              <span>{item.icon}{item.label === "Alerts" && <i />}</span>
              <small>{item.label}</small>
            </button>
          ),
        )}
      </nav>
    </>
  );
}

export default function App() {
  const [signedIn, setSignedIn] = useState(true);
  const [tab, setTabState] = useState<Tab>("Home");
  const [reportOpen, setReportOpen] = useState(false);
  const [detail, setDetail] = useState<Issue | null>(null);
  const [role, setRole] = useState<Role>("Student");
  const [votes, setVotes] = useState<Set<number>>(new Set());

  const setTab = (next: Tab) => {
    if (next === "Report") setReportOpen(true);
    else setTabState(next);
  };
  const toggleVote = (id: number) => {
    setVotes((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  let content: React.ReactNode;
  if (tab === "Feed") content = <Feed openIssue={setDetail} votes={votes} toggleVote={toggleVote} />;
  else if (tab === "Alerts") content = <Alerts />;
  else if (tab === "Profile") content = <Profile role={role} setRole={(next) => { setRole(next); setTabState("Home"); }} onSignOut={() => setSignedIn(false)} />;
  else if (role === "Warden") content = <WardenHome openIssue={setDetail} />;
  else if (role === "Worker") content = <WorkerHome openIssue={setDetail} />;
  else content = <StudentHome setTab={setTab} openIssue={setDetail} votes={votes} toggleVote={toggleVote} />;

  if (!signedIn) return <Login onLogin={(next) => { setRole(next); setSignedIn(true); setTabState("Home"); }} />;

  return (
    <div className="app-shell">
      <Navigation tab={tab} setTab={setTab} role={role} />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${role}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </main>
      <ReportSheet open={reportOpen} onClose={() => setReportOpen(false)} />
      <AnimatePresence>{detail && <IssueDetail issue={detail} onClose={() => setDetail(null)} />}</AnimatePresence>
    </div>
  );
}
