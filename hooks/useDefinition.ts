"use client";

import { useState, useCallback } from "react";
import type { Definition, GeneratorInput } from "@/types";
import toast from "react-hot-toast";

export function useDefinition() {
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (input: GeneratorInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setDefinitions(data.definitions);
      return data.definitions as Definition[];
    } catch (err: any) {
      const msg = err.message || "Failed to generate";
      setError(msg);
      toast.error(msg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const remix = useCallback(
    async (
      definition: Definition,
      mode: "roast" | "sweeter" | "more-chaotic" | "devastating" | "pet-edition"
    ) => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/generate/remix", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ definition, mode }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Remix failed");

        setDefinitions((prev) =>
          prev.map((d) => (d.id === definition.id ? data.definition : d))
        );
        return data.definition as Definition;
      } catch (err: any) {
        toast.error(err.message || "Remix failed");
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setDefinitions([]);
    setError(null);
  }, []);

  return { definitions, isLoading, error, generate, remix, reset };
}
