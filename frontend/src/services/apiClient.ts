


export const apiClient = async(url : string, options : RequestInit = {}, isRetry = false) => {

    try {
    const res = await fetch(url, {
      ...options,
      credentials: "include"
    });

    // ✅ Si tout va bien (pas 401/403), on renvoie la réponse
    if (res.status !== 401 && res.status !== 403) {
      return res;
    }

    // ❌ Si c'est déjà un retry, on ne retente pas encore (évite la boucle)
    if (isRetry) {
      window.location.href = "/account";
      throw new Error("Unauthorized - already retried");
    }

    // 🔁 Tentative de refresh
    const refreshRes = await fetch("https://mobilia-xzo6.onrender.com/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include"
    });

    if (!refreshRes.ok) {
      window.location.href = "/account";
      throw new Error("Unable to refresh token");
    }

    // ✅ On refait la requête UNE seule fois
    return apiClient(url, options, true);

  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}
 
