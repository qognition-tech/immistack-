import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem, FaqSchema } from './Schema';

/**
 * Objection / FAQ accordion. Also the FAQPage JSON-LD source for the page it
 * renders on — pass the same `items` to both. Ships nothing (section omitted)
 * when `items` is empty, per Elena's empty-state spec — never a zero-item
 * shell.
 */
export const ObjectionAccordion: React.FC<{ items: FaqItem[]; emitSchema?: boolean }> = ({ items, emitSchema = true }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (items.length === 0) return null;

  return (
    <div>
      {emitSchema && <FaqSchema items={items} />}
      <div>
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          const panelId = `accordion-panel-${i}`;
          const triggerId = `accordion-trigger-${i}`;
          return (
            <div className="accordion-item" key={item.question}>
              <h3 className="m-0" style={{ marginTop: 0 }}>
                <button
                  id={triggerId}
                  className="accordion-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{item.question}</span>
                  <ChevronDown className={`accordion-chevron ${isOpen ? 'is-open' : ''}`} aria-hidden="true" size={20} />
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={triggerId} className={`accordion-panel ${isOpen ? 'is-open' : ''}`}>
                <div>
                  <p className="accordion-panel-inner">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
