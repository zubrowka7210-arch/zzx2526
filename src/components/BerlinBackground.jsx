import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLenis } from "lenis/react";

const BerlinBackground = () => {
  const containerRef = useRef(null);
  const globalVelocityRef = useRef(0);
  const touchStartRef = useRef(0);
  const [positions, setPositions] = useState({
    left: [0, 1, 2, 3],
    right: [0.5, 1.5, 2.5, 3.5],
  });
  const lenis = useLenis();

  // 数据源
  const PROJECT_DATA = [
    { title: "河源\n文旅", no: "N. 01", year: "Y. 2025", image: "/case1 heyuan/hy01.png", detailId: "page01" },
    { title: "智能\n配乐", no: "N. 02", year: "Y. 2025", image: "/case2 music/花鸟.png", detailId: "page02" },
    { title: "其他\n作品", no: "N. 03", year: "Y. 2025", image: "/other/设计2-1.png", detailId: "page03" },
    { title: "其他\n作品", no: "N. 04", year: "Y. 2025", image: "/other/原型2.png", detailId: "page03" },
  ];

  const CONFIG = {
    size: 200, // 圆形直径（px）
    gap: 40, // 纵向间隔（px）
    trackOffset: 150, // 左右两排的中心跨度（px）
    friction: 0.6, // 降低摩擦力，增加惯性持续时间
    bounce: 0.3, // 弹性系数，增加轻微的回弹效果
    settleThreshold: 0.05, // 完全停止的阈值
  };

  const totalHeight = 4 * CONFIG.size + 4 * CONFIG.gap;

  const mod = (n, m) => {
    return ((n % m) + m) % m;
  };

  useEffect(() => {
    const handleWheel = (e) => {
      globalVelocityRef.current += e.deltaY * 0.5;
    };

    const handleTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const delta = touchStartRef.current - e.touches[0].clientY;
      touchStartRef.current = e.touches[0].clientY;
      globalVelocityRef.current += delta * 1;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    lenis?.stop();

    const animate = () => {
      // 应用摩擦力
      globalVelocityRef.current *= CONFIG.friction;

      // 添加轻微的弹性效果（当速度接近0时）
      if (
        Math.abs(globalVelocityRef.current) < 2 &&
        Math.abs(globalVelocityRef.current) > CONFIG.settleThreshold
      ) {
        globalVelocityRef.current *= 1 - CONFIG.bounce * 0.1;
      }

      // 完全停止阈值
      if (Math.abs(globalVelocityRef.current) < CONFIG.settleThreshold) {
        globalVelocityRef.current = 0;
      }

      setPositions((prev) => {
        const newLeft = prev.left.map((pos) => {
          const newPos =
            pos + globalVelocityRef.current / (CONFIG.size + CONFIG.gap);
          return mod(newPos + 4, 4);
        });

        const newRight = prev.right.map((pos) => {
          const newPos =
            pos - globalVelocityRef.current / (CONFIG.size + CONFIG.gap);
          return mod(newPos + 4, 4);
        });

        return { left: newLeft, right: newRight };
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      lenis?.start();
    };
  }, [lenis]);

  const renderCircle = (index, isText, track, position) => {
    const baseY = position * (CONFIG.size + CONFIG.gap);
    const x = track === "left" ? -CONFIG.trackOffset : CONFIG.trackOffset;
    const y = baseY - totalHeight / 2;
    const project = PROJECT_DATA[index % PROJECT_DATA.length];

    const style = {
      position: "absolute",
      width: CONFIG.size,
      height: CONFIG.size,
      borderRadius: "50%",
      left: `calc(50% + ${x}px - ${CONFIG.size / 2}px)`,
      top: `calc(50% + ${y}px - ${CONFIG.size / 2}px)`,
      transform: `translateY(${globalVelocityRef.current * 0.15}px) scale(${1 + Math.abs(globalVelocityRef.current) * 0.001})`,
      transition: "transform 0.05s ease-out",
      willChange: "transform",
    };

    const linkStyle = {
      ...style,
      cursor: "pointer",
      textDecoration: "none",
    };

    if (isText) {
      const lines = project.title.split("\n");

      return (
        <Link
          key={`${track}-${index}`}
          to={`/detail/${project.detailId}`}
          style={linkStyle}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontFamily: '"Georgia", serif',
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "rgba(40, 40, 40, 0.6)",
                marginBottom: "20px",
              }}
            >
              {project.no}
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "500",
                fontStyle: "italic",
                color: "#1a1a1a",
                lineHeight: "1.2",
              }}
            >
              {lines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "rgba(40, 40, 40, 0.6)",
                marginTop: "20px",
              }}
            >
              {project.year}
            </div>
          </div>
        </Link>
      );
    } else {
      return (
        <Link
          key={`${track}-${index}`}
          to={`/detail/${project.detailId}`}
          style={linkStyle}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
        </Link>
      );
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {positions.left.map((pos, i) => {
        const isText = i % 2 === 0;
        return renderCircle(i, isText, "left", pos);
      })}
      {positions.right.map((pos, i) => {
        const isText = i % 2 !== 0;
        return renderCircle(i, isText, "right", pos);
      })}
    </div>
  );
};

export default BerlinBackground;
