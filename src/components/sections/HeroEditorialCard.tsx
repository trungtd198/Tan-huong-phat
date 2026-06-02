import { BaseCard, Overline } from '@/components/ui';

const HeroEditorialCard = () => (
  <BaseCard
    variant="glass"
    hover={false}
    className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.08] p-0 shadow-xl"
  >
    <div className="relative min-h-[440px] bg-[linear-gradient(160deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] p-6 sm:p-8">
      <div className="absolute inset-x-8 top-8 h-px bg-white/10" />
      <div className="absolute inset-y-8 right-8 w-px bg-white/10" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Overline className="mb-2 text-sand-300">
              Tuyển chọn biên tập
            </Overline>
            <div className="max-w-xs font-display text-3xl leading-tight text-white sm:text-4xl">
              Một quy trình đủ tối giản để trở thành thói quen đẹp.
            </div>
          </div>

          <div className="rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-[0.28em] text-gold-300">
            Từ 2014
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-end justify-center gap-4 pt-10">
          <div className="relative h-52 w-28 rounded-[2rem] rounded-t-[2.8rem] bg-gradient-to-b from-sand-100 to-sand-300 shadow-xl shadow-black/10">
            <div className="absolute inset-x-5 top-5 h-6 rounded-full bg-white/60" />
            <div className="absolute inset-x-7 top-16 h-24 rounded-[1.5rem] border border-white/60 bg-white/30" />
            <div className="absolute inset-x-0 bottom-8 text-center font-display text-2xl text-sand-800">
              THP
            </div>
          </div>

          <div className="relative mb-6 h-40 w-20 rounded-[1.7rem] bg-gradient-to-b from-brand-200 to-brand-400 shadow-lg shadow-brand-900/20">
            <div className="absolute inset-x-4 top-4 h-5 rounded-full bg-white/45" />
            <div className="absolute inset-x-0 bottom-6 text-center font-display text-lg text-white">
              C
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 hidden h-24 rounded-[2rem] border border-white/10 bg-white/5 blur-sm sm:block" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <Overline className="mb-2 tracking-[0.28em] text-sand-300">
              Cảm giác đặc trưng
            </Overline>
            <div className="font-display text-2xl text-white">
              Rạng rỡ trong trẻo, không bóng nhờn.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <Overline className="mb-2 tracking-[0.28em] text-sand-300">
              Trạng thái làn da
            </Overline>
            <div className="font-display text-2xl text-white">
              Êm dịu, cân bằng, sáng khỏe.
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
);

export { HeroEditorialCard };
