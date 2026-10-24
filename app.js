const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

async function loadArticles() {
  const container = document.getElementById("articles");
  try {
    const response = await fetch("./data/articles.json", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    if (!Array.isArray(data.articles) || data.articles.length === 0) return;
    container.innerHTML = "";
    data.articles.slice(0, 30).forEach(article => {
      const card = document.createElement("article");
      card.className = "article-card";
      const category = String(article.category || "Afrique");
      const url = safeUrl(article.url);
      card.innerHTML = `<div class="article-art ${artClass(category)}"><span>${escapeHtml(category.toUpperCase())}</span><b>${escapeHtml(category)}</b></div>
      <div class="article-body"><span class="category">${escapeHtml(category.toUpperCase())}</span><h3>${escapeHtml(article.title || "Actualité")}</h3>
      <p>${escapeHtml(article.summary || "Consultez la source pour les détails.")}</p>
      <a class="article-meta" href="${url}" target="_blank" rel="noopener noreferrer">Lire la source : ${escapeHtml(article.source || "Source")} ↗</a></div>`;
      container.appendChild(card);
    });
    const updated = document.getElementById("updated");
    if (updated && data.updated_at) updated.textContent = "Flux actualisé : " + new Date(data.updated_at).toLocaleString("fr-FR");
  } catch (_) { /* conserve les cartes de démonstration si le flux n'est pas configuré */ }
}
function safeUrl(value) { try { const u = new URL(value); return ["https:","http:"].includes(u.protocol) ? u.href : "#"; } catch { return "#"; } }
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function artClass(c) { c = c.toLowerCase(); return c.includes("cameroun") ? "art-cm" : (c.includes("gaming") || c.includes("jeu") ? "art-game" : "art-af"); }
function filterArticles(category) {
  document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b.dataset.category === category));
  let shown = 0;
  document.querySelectorAll("#articles .article-card").forEach(card => {
    const label = card.querySelector(".category")?.textContent?.toLowerCase() || "";
    const visible = category === "Tous" || label.includes(category.toLowerCase());
    card.hidden = !visible; if (visible) shown++;
  });
  const empty = document.getElementById("empty"); if (empty) empty.hidden = shown !== 0;
}
document.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => filterArticles(btn.dataset.category)));
loadArticles();
