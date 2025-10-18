// ✅ Variable globale pour éviter les refresh multiples simultanés
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

export const apiClient = async(
  url: string, 
  options: RequestInit = {}, 
  isRetry = false
): Promise<Response> => {
  try {
    const res = await fetch(url, {
      ...options,
      credentials: "include"
    });

    // ✅ Si tout va bien, on renvoie la réponse
    if (res.status !== 401 && res.status !== 403) {
      return res;
    }

    // ❌ Si c'est déjà un retry, on redirige
    if (isRetry) {
      console.warn("Auth failed after retry, redirecting to /account");
      window.location.href = "/account";
      throw new Error("Unauthorized - already retried");
    }

    // 🔄 Si un refresh est déjà en cours, on attend
    if (isRefreshing && refreshPromise) {
      console.log("Refresh already in progress, waiting...");
      const success = await refreshPromise;
      
      if (success) {
        // ✅ Le refresh a réussi, on retente la requête originale
        return apiClient(url, options, true);
      } else {
        // ❌ Le refresh a échoué
        window.location.href = "/account";
        throw new Error("Refresh failed");
      }
    }

    // 🆕 Début du refresh
    isRefreshing = true;
    refreshPromise = attemptRefresh();

    const success = await refreshPromise;
    
    // Reset du flag
    isRefreshing = false;
    refreshPromise = null;

    if (success) {
      // ✅ Retry la requête originale
      return apiClient(url, options, true);
    } else {
      // ❌ Échec du refresh
      window.location.href = "/account";
      throw new Error("Unable to refresh token");
    }

  } catch (err) {
    console.error("API error:", err);
    isRefreshing = false;
    refreshPromise = null;
    throw err;
  }
}

// Fonction séparée pour le refresh
async function attemptRefresh(): Promise<boolean> {
  try {
    console.log("Attempting token refresh...");
    
    const refreshRes = await fetch(
      "https://mobilia-xzo6.onrender.com/api/v1/auth/refresh-token", 
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!refreshRes.ok) {
      console.error("Refresh failed:", refreshRes.status);
      return false;
    }

    console.log("Token refresh successful");
    return true;
    
  } catch (err) {
    console.error("Refresh attempt error:", err);
    return false;
  }
}

// ✅ Helper pour vérifier si l'utilisateur est authentifié
export const checkAuth = async(): Promise<boolean> => {
  try {
    const res = await fetch(
      "https://mobilia-xzo6.onrender.com/api/v1/auth/check", 
      {
        method: "GET",
        credentials: "include"
      }
    );
    
    return res.ok;
  } catch {
    return false;
  }
}