import LoadingSkeleton from "./components/LoadingSkeleton";

export default function Loading() {
  return (
    <div
      style={{
        padding: "3rem 2rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          🌴 沖縄天気ナビ
        </h1>
        <p style={{ fontSize: "1.2rem", color: "rgba(255, 255, 255, 0.9)" }}>
          データを読み込んでいます...
        </p>
      </header>
      <LoadingSkeleton />
    </div>
  );
}
