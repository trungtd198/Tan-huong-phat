'use client';

import { Sparkles } from 'lucide-react';
import { useState } from 'react';

type ProductDetailInfoTabsProps = {
  descriptionParagraphs: string[];
  ingredients?: string;
  howToUseSteps: string[];
};

const tabItems = [
  { id: 'story', label: 'Mô tả sản phẩm' },
  { id: 'ingredients', label: 'Thành phần chi tiết' },
  { id: 'usage', label: 'Hướng dẫn sử dụng' },
] as const;

type TabId = (typeof tabItems)[number]['id'];

const ProductDetailInfoTabs = ({
  descriptionParagraphs,
  ingredients,
  howToUseSteps,
}: ProductDetailInfoTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabId>('story');

  return (
    <div className="space-y-6">
      <div className="flex gap-6 overflow-x-auto border-b border-gold-500/10">
        {tabItems.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={[
              'shrink-0 pb-3 text-xs font-bold uppercase tracking-wider transition',
              activeTab === tab.id
                ? 'border-b-2 border-gold-500 text-gold-600'
                : 'text-sand-400 hover:text-espresso-900',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'story' ? (
        <div className="space-y-3 text-sm leading-7 text-sand-600">
          {descriptionParagraphs.length > 0 ? (
            descriptionParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))
          ) : (
            <p>Thông tin mô tả sản phẩm đang được cập nhật.</p>
          )}
        </div>
      ) : null}

      {activeTab === 'ingredients' ? (
        <div className="text-sm leading-7 text-sand-600">
          <p>{ingredients || 'Thông tin thành phần đang được cập nhật.'}</p>
        </div>
      ) : null}

      {activeTab === 'usage' ? (
        <ol className="list-decimal space-y-2 pl-4 text-sm leading-7 text-sand-600">
          {howToUseSteps.length > 0 ? (
            howToUseSteps.map((step) => <li key={step}>{step}</li>)
          ) : (
            <li>Liên hệ Tân Hương Phát để được tư vấn cách sử dụng phù hợp.</li>
          )}
        </ol>
      ) : null}

      <div className="rounded-2xl border border-gold-500/15 bg-white/70 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-600">
          <Sparkles className="size-4" />
          <span>Thành phần chính</span>
        </div>
        <p className="mt-3 text-sm font-medium leading-7 text-sand-800">
          {ingredients || 'Thông tin thành phần đang được cập nhật.'}
        </p>
      </div>
    </div>
  );
};

export { ProductDetailInfoTabs };
export type { ProductDetailInfoTabsProps };
