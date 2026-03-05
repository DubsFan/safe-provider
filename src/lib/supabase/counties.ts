import { createSupabaseServerClient } from "./server";
import type { CountyRow, ServiceRow } from "@/types/database.types";

export async function getLiveCounties(): Promise<CountyRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("counties")
    .select("*")
    .eq("launch_status", "live")
    .order("sort_order");
  return data ?? [];
}

export async function getActiveServices(): Promise<ServiceRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("active", true);
  return data ?? [];
}
