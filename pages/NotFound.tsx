import React from 'react';
import { Link } from 'react-router-dom';

/** Plain, on-brand. No illustration, no joke copy (voice file: humour 1/10). */
export const NotFound: React.FC = () => (
  <div className="wrap py-24 text-center">
    <h1 style={{ marginTop: 0 }}>404</h1>
    <p className="lede mx-auto mb-8">That page doesn't exist.</p>
    <div className="flex flex-wrap justify-center gap-3">
      <Link to="/" className="btn btn-primary">
        Go home
      </Link>
      <Link to="/pricing" className="btn btn-secondary">
        See pricing
      </Link>
    </div>
  </div>
);
