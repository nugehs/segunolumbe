import { useEffect, useState } from 'react';
import { quoteForToday } from '../data/quotes';

export default function DailyQuote() {
  const [q, setQ] = useState(() => quoteForToday());

  useEffect(() => {
    setQ(quoteForToday(new Date()));
  }, []);

  return (
    <p className="daily rv">
      <span className="mark">&ldquo;</span>
      <span className="dq-text" suppressHydrationWarning>
        {q.text}
      </span>
      <span className="ori">
        &mdash;{' '}
        <span className="dq-ori" suppressHydrationWarning>
          {q.origin}
        </span>
      </span>
    </p>
  );
}
