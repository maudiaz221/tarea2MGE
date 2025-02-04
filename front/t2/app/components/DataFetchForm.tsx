"use client"

import { z } from "zod"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  OverallQual: z.coerce.number().int().positive(),
  GrLivArea: z.coerce.number().int().positive(),
  TotalBsmtSF: z.coerce.number().int().positive(),
  BsmtFinSF1: z.coerce.number().int().positive(),
  FirstFlrSF: z.coerce.number().int().positive(),
  GarageCars: z.coerce.number().int().positive(),
  SecondFlrSF: z.coerce.number().int().positive(),
  LotArea: z.coerce.number().int().positive(),
  OverallCond: z.coerce.number().int().positive(),
  GarageArea: z.coerce.number().int().positive(),
  YearBuilt: z.coerce.number().int().positive(),
})

type FormValues = z.infer<typeof formSchema>

const fieldDescriptions: Record<keyof FormValues, string> = {
  OverallQual: "Overall material and finish quality (1-10)",
  GrLivArea: "Above grade (ground) living area square feet",
  TotalBsmtSF: "Total square feet of basement area",
  BsmtFinSF1: "Type 1 finished square feet of basement area",
  FirstFlrSF: "First Floor square feet",
  GarageCars: "Size of garage in car capacity",
  SecondFlrSF: "Second floor square feet",
  LotArea: "Lot size in square feet",
  OverallCond: "Overall condition rating (1-10)",
  GarageArea: "Size of garage in square feet",
  YearBuilt: "Original construction year",
}

export default function DataFetchForm() {
  const [prediction, setPrediction] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      OverallQual: 0,
      GrLivArea: 0,
      TotalBsmtSF: 0,
      BsmtFinSF1: 0,
      FirstFlrSF: 0,
      GarageCars: 0,
      SecondFlrSF: 0,
      LotArea: 0,
      OverallCond: 0,
      GarageArea: 0,
      YearBuilt: 0,
    },
  })

  async function onSubmit(data: FormValues) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      setPrediction(result.prediction)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {Object.keys(form.getValues()).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as keyof FormValues}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormDescription>{fieldDescriptions[field.name as keyof FormValues]}</FormDescription>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
      {prediction !== null && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Prediction Result:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  )
}

