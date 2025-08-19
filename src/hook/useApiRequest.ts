// src/hooks/useApiRequest.ts
import { useLoading } from "@/contexts/LoadingContext";
import { Alert } from "react-native";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export function useApiRequest(baseUrl?: string) {
  const { showLoading, hideLoading } = useLoading();

  async function request<T>(
    url: string,
    method: HttpMethod = "GET",
    body?: any,
    message?: string
  ): Promise<T | null> {
    try {
      showLoading(message || "Carregando...");

      const response = await fetch((baseUrl || "") + url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error: any) {
      console.error("Erro na requisição:", error);
      Alert.alert("Erro", error?.message || "Algo deu errado, tente novamente.");
      return null;
    } finally {
      hideLoading();
    }
  }

  // atalhos para facilitar uso
  const get = <T>(url: string, message?: string) => request<T>(url, "GET", undefined, message);
  const post = <T>(url: string, body: any, message?: string) => request<T>(url, "POST", body, message);
  const put = <T>(url: string, body: any, message?: string) => request<T>(url, "PUT", body, message);
  const del = <T>(url: string, message?: string) => request<T>(url, "DELETE", undefined, message);

  return { request, get, post, put, del };
}
