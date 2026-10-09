"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  theme?: "light" | "dark";
  className?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  theme = "dark",
  className = "",
}: RadialOrbitalTimelineProps) {
  const isLight = theme === "light";
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    if (isLight) {
      switch (status) {
        case "completed":
          return "text-emerald-700 bg-emerald-50 border-emerald-200 font-semibold";
        case "in-progress":
          return "text-blue-700 bg-blue-50 border-blue-200 font-semibold";
        case "pending":
          return "text-neutral-600 bg-neutral-100 border-neutral-200";
        default:
          return "text-neutral-600 bg-neutral-100 border-neutral-200";
      }
    }

    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className={`w-full h-[650px] sm:h-[750px] flex flex-col items-center justify-center overflow-hidden relative select-none rounded-3xl ${
        isLight
          ? "bg-gradient-to-b from-neutral-50/50 via-white to-neutral-50/80 border border-neutral-200/90 text-neutral-900 shadow-sm"
          : "bg-black border border-purple-900 text-white"
      } ${className}`}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Center Glowing Hub */}
          <div
            className={`absolute w-16 h-16 rounded-full animate-pulse flex items-center justify-center z-10 shadow-xl ${
              isLight
                ? "bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 shadow-blue-500/25"
                : "bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 shadow-purple-500/30"
            }`}
          >
            <div
              className={`absolute w-20 h-20 rounded-full border animate-ping opacity-60 ${
                isLight ? "border-blue-400/40" : "border-white/20"
              }`}
            ></div>
            <div
              className={`absolute w-24 h-24 rounded-full border animate-ping opacity-40 ${
                isLight ? "border-indigo-400/30" : "border-white/10"
              }`}
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className={`w-8 h-8 rounded-full backdrop-blur-md shadow-inner ${
                isLight ? "bg-white/90" : "bg-white/80"
              }`}
            ></div>
          </div>

          {/* Orbital Guide Ring */}
          <div
            className={`absolute w-96 h-96 rounded-full border ${
              isLight ? "border-neutral-300/80 border-dashed" : "border-white/10"
            }`}
          ></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Node Aura / Pulse */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: isLight
                      ? `radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(37,99,235,0) 70%)`
                      : `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                {/* Node Icon Circle */}
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                  ${
                    isLight
                      ? isExpanded
                        ? "bg-blue-600 text-white border-2 border-blue-600 shadow-xl shadow-blue-500/30"
                        : isRelated
                        ? "bg-blue-100 text-blue-700 border-2 border-blue-500 animate-pulse shadow-sm"
                        : "bg-white text-neutral-800 border-2 border-neutral-300 shadow-md hover:border-blue-600 hover:text-blue-600"
                      : isExpanded
                      ? "bg-white text-black border-2 border-white shadow-lg shadow-white/30"
                      : isRelated
                      ? "bg-white/50 text-black border-2 border-white animate-pulse"
                      : "bg-black text-white border-2 border-white/40"
                  }
                `}
                >
                  <Icon size={16} />
                </div>

                {/* Node Text Label */}
                <div
                  className={`
                  absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs font-semibold tracking-wider transition-all duration-300
                  ${
                    isLight
                      ? isExpanded
                        ? "text-blue-700 font-bold scale-110 drop-shadow-xs"
                        : "text-neutral-700 hover:text-neutral-900"
                      : isExpanded
                      ? "text-white scale-125"
                      : "text-white/70"
                  }
                `}
                >
                  {item.title}
                </div>

                {/* Node Expanded Card */}
                {isExpanded && (
                  <Card
                    className={`absolute top-20 left-1/2 -translate-x-1/2 w-72 backdrop-blur-xl shadow-2xl overflow-visible z-50 ${
                      isLight
                        ? "bg-white/95 border-neutral-200/90 text-neutral-900 shadow-blue-500/10"
                        : "bg-black/90 border-white/30 shadow-white/10 text-white"
                    }`}
                  >
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 ${
                        isLight ? "bg-blue-500" : "bg-white/50"
                      }`}
                    ></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </Badge>
                        <span
                          className={`text-xs font-mono ${
                            isLight ? "text-neutral-500" : "text-white/50"
                          }`}
                        >
                          {item.date}
                        </span>
                      </div>
                      <CardTitle
                        className={`text-sm mt-2 font-bold font-display ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}
                      >
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent
                      className={`text-xs ${
                        isLight ? "text-neutral-600" : "text-white/80"
                      }`}
                    >
                      <p className="leading-relaxed">{item.content}</p>

                      {/* Energy / Alignment Indicator */}
                      <div
                        className={`mt-4 pt-3 border-t ${
                          isLight ? "border-neutral-200/70" : "border-white/10"
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span
                            className={`flex items-center ${
                              isLight ? "text-neutral-600" : "text-neutral-300"
                            }`}
                          >
                            <Zap
                              size={10}
                              className={`mr-1 ${
                                isLight ? "text-blue-600" : "text-amber-400"
                              }`}
                            />
                            Impact Alignment
                          </span>
                          <span
                            className={`font-mono font-bold ${
                              isLight ? "text-blue-600" : "text-amber-400"
                            }`}
                          >
                            {item.energy}%
                          </span>
                        </div>
                        <div
                          className={`w-full h-1.5 rounded-full overflow-hidden ${
                            isLight ? "bg-neutral-100" : "bg-white/10"
                          }`}
                        >
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Connected Nodes */}
                      {item.relatedIds.length > 0 && (
                        <div
                          className={`mt-4 pt-3 border-t ${
                            isLight ? "border-neutral-200/70" : "border-white/10"
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            <Link
                              size={10}
                              className={`mr-1 ${
                                isLight ? "text-neutral-500" : "text-white/70"
                              }`}
                            />
                            <h4
                              className={`text-[10px] uppercase tracking-wider font-semibold ${
                                isLight ? "text-neutral-500" : "text-white/70"
                              }`}
                            >
                              Interconnected Pillars
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className={`flex items-center h-6 px-2.5 py-0 text-xs rounded-lg transition-all ${
                                    isLight
                                      ? "border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800"
                                      : "border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white"
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className={`ml-1 ${
                                      isLight ? "text-neutral-400" : "text-white/60"
                                    }`}
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
