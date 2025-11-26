import { Check, Circle } from "lucide-react";

interface Milestone {
  label: string;
  percentage: number;
}

interface DevelopmentProgressBarProps {
  progress: number;
  currentPhase: string;
}

export function DevelopmentProgressBar({ progress, currentPhase }: DevelopmentProgressBarProps) {
  const milestones: Milestone[] = [
    { label: "Planning", percentage: 0 },
    { label: "Design", percentage: 25 },
    { label: "Development", percentage: 50 },
    { label: "Testing", percentage: 75 },
    { label: "Launch", percentage: 100 }
  ];

  return (
    <div className="bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800">
      <h3 className="text-xl font-semibold mb-4 text-white">Development Progress</h3>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-400">Current Phase: <span className="text-white font-semibold">{currentPhase}</span></span>
          <span className="text-2xl font-bold text-white">{progress}%</span>
        </div>

        <div className="relative">
          <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-500 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          <div className="relative mt-8">
            <div className="flex justify-between">
              {milestones.map((milestone, index) => {
                const isCompleted = progress >= milestone.percentage;
                const isCurrent =
                  progress >= milestone.percentage &&
                  (index === milestones.length - 1 || progress < milestones[index + 1].percentage);

                return (
                  <div key={milestone.label} className="flex flex-col items-center relative" style={{ width: '20%' }}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                        isCompleted
                          ? isCurrent
                            ? 'bg-gradient-to-r from-blue-600 to-green-500 ring-4 ring-blue-500/30'
                            : 'bg-green-600'
                          : 'bg-neutral-700'
                      }`}
                    >
                      {isCompleted && !isCurrent ? (
                        <Check className="h-4 w-4 text-white" />
                      ) : (
                        <Circle
                          className={`h-4 w-4 ${
                            isCurrent ? 'text-white animate-pulse' : 'text-neutral-400'
                          }`}
                          fill={isCurrent ? 'currentColor' : 'none'}
                        />
                      )}
                    </div>
                    <span
                      className={`text-xs text-center ${
                        isCompleted ? 'text-white font-semibold' : 'text-neutral-500'
                      }`}
                    >
                      {milestone.label}
                    </span>
                    <span className="text-[10px] text-neutral-600 mt-0.5">
                      {milestone.percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
          <div>
            <p className="text-xs text-neutral-500 mb-1">Completed</p>
            <p className="text-lg font-bold text-green-500">{Math.floor((progress / 100) * 5)}/5 Milestones</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 mb-1">Estimated Launch</p>
            <p className="text-lg font-bold text-blue-400">
              {progress < 75 ? 'Q2 2025' : progress < 95 ? 'Q1 2025' : 'Coming Soon'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
