"use client";

import { sitePath } from "@/lib/site";

import { useCallback, useEffect, useState } from "react";

export type MediumFeedArticle = {
  title: string;
  date: string;
  topic: string;
  summary: string;
  url: string;
  image?: string;
};

type FeedResponse = {
  articles: MediumFeedArticle[];
  lastBuildDate: string | null;
};

type MediumRssWidgetProps = {
  fallbackArticles: MediumFeedArticle[];
  profileUrl: string;
};

export function MediumRssWidget({ fallbackArticles, profileUrl }: MediumRssWidgetProps) {
  const [articles, setArticles] = useState(fallbackArticles);
  const [feedState, setFeedState] = useState<"loading" | "live" | "fallback">("loading");
  const [lastBuildDate, setLastBuildDate] = useState<string | null>(null);

  const loadFeed = useCallback(async () => {
    try {
      const response = await fetch(sitePath("/api/medium-feed"), { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Feed unavailable");

      const data = (await response.json()) as FeedResponse;
      if (!Array.isArray(data.articles) || data.articles.length === 0) throw new Error("Empty feed");

      setArticles(data.articles);
      setLastBuildDate(data.lastBuildDate);
      setFeedState("live");
    } catch {
      setArticles(fallbackArticles);
      setFeedState("fallback");
    }
  }, [fallbackArticles]);

  useEffect(() => {
    // Feed state changes only after the asynchronous network request resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadFeed();
  }, [loadFeed]);

  const statusText = feedState === "live" ? "LIVE FROM MEDIUM" : feedState === "loading" ? "SYNCING FEED" : "SHOWING SAVED COPY";
  const updateText = lastBuildDate
    ? `Feed updated ${new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date(lastBuildDate))} IST`
    : "The widget checks Medium whenever this page opens.";

  return (
    <div className="rss-widget">
      <div className="rss-toolbar" aria-live="polite">
        <div className={`rss-status rss-status-${feedState}`}><span aria-hidden="true" /> <b>{statusText}</b><small>{updateText}</small></div>
        <div className="rss-actions">
          <button type="button" onClick={() => { setFeedState("loading"); void loadFeed(); }} disabled={feedState === "loading"}>
            {feedState === "loading" ? "REFRESHING…" : "REFRESH FEED"} ↻
          </button>
          <a href="https://medium.com/feed/@sheevumgoel" target="_blank" rel="noreferrer">RSS LINK ↗</a>
        </div>
      </div>

      <div className="medium-grid" aria-label="Five latest Medium articles by Sheevum Goel">
        {articles.map((article, index) => (
          <article className={`medium-card medium-card-${index + 1} reveal`} key={article.url}>
            <div className="medium-card-top"><span>NO. {String(index + 1).padStart(2, "0")}</span><b>{article.topic}</b></div>
            {article.image ? <img className="medium-card-image" src={article.image} alt="" loading="lazy" decoding="async" /> : null}
            <time>{article.date}</time>
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
            <a href={article.url} target="_blank" rel="noreferrer" aria-label={`Read ${article.title} on Medium`}>
              <span>READ ON MEDIUM</span><i>↗</i>
            </a>
          </article>
        ))}
      </div>

      {feedState === "fallback" ? (
        <p className="rss-notice">Medium did not respond just now, so the latest saved articles remain available. Refresh this widget or visit the profile directly.</p>
      ) : null}

      <div className="medium-profile-callout reveal">
        <div><small>A LIVE WINDOW INTO THE LATEST IDEAS.</small><h3>KEEP READING WITH SHEEVUM.</h3><p>Explore more writing on AI, MSME growth, technology, marketing and the future of Bharat&apos;s local businesses.</p></div>
        <a className="pop-button cream" href={profileUrl} target="_blank" rel="noreferrer">VISIT MEDIUM PROFILE ↗</a>
      </div>
    </div>
  );
}
