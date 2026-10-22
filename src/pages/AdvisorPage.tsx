import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AiAdvisor } from "../types/index";
import { askAi } from "../api/client";
import { advisorFormSchema, type AdvisorFormValues } from "../schemas/advisorSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Record mapping each urgency level to Tailwind badge colors.
// Adding a new urgency enum variant requires a color entry here or TypeScript will refuse to compile.
const URGENCY_STYLE: Record<AiAdvisor["urgency"], string> = {
  critical: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800",
  standard: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800",
  low: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800",
};

const URGENCY_LABEL: Record<AiAdvisor["urgency"], string> = {
  critical: "Critical Urgency",
  standard: "Standard Urgency",
  low: "Low Urgency",
};

function AdvisorPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdvisorFormValues>({
    resolver: zodResolver(advisorFormSchema),
    // Default validation mode (NOT onBlur) so errors update on submit and typing,
    // avoiding the issue where an error message vanishing moves the button under the mouse.
    defaultValues: { prompt: "" },
  });

  // A mutation rather than a query: runs on-demand when the engineer requests advice,
  // never on page load, and results are not cached.
  const adviceMutation = useMutation({
    mutationFn: askAi,
  });

  const onSubmit = (values: AdvisorFormValues): void => {
    adviceMutation.mutate(values.prompt);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI Provision Advisor
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Describe the cloud resource you need and receive AI-guided architecture suggestions, risk analysis, and urgency ratings before submitting a request.
        </p>
      </div>

      {/* Input Form Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-1.5">
            <Label htmlFor="prompt" className="text-foreground font-medium">
              Resource Requirements & Context
            </Label>
            <textarea
              id="prompt"
              rows={6}
              {...register("prompt")}
              aria-invalid={errors.prompt ? true : undefined}
              placeholder="e.g. I need an AWS RDS PostgreSQL instance for our new order processing service in ap-southeast-1. Expected volume is ~500 transactions per day..."
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            />
            {errors.prompt && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.prompt.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={adviceMutation.isPending}
            className="justify-self-start"
          >
            {adviceMutation.isPending ? "Analyzing Request..." : "Get AI Advice"}
          </Button>

          {/* API error: rate limit, quota, or 502 service error */}
          {adviceMutation.isError && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-200 text-sm text-red-700 dark:bg-red-900/30 dark:border-red-800/40 dark:text-red-400">
              {adviceMutation.error.message}
            </div>
          )}
        </form>
      </div>

      {/* AI Advice Output Card */}
      {adviceMutation.data && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Advisor Analysis
            </h2>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                URGENCY_STYLE[adviceMutation.data.urgency]
              }`}
            >
              {URGENCY_LABEL[adviceMutation.data.urgency]}
            </span>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
              Request Summary
            </h3>
            <p className="text-base text-gray-900 dark:text-gray-100">
              {adviceMutation.data.summary}
            </p>
          </div>

          {/* Suggestions */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Suggestions & Improvements
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              {adviceMutation.data.suggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          </div>

          {/* Risks */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Risks & Considerations
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              {adviceMutation.data.risks.map((risk) => (
                <li key={risk}>{risk}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdvisorPage;
