import { Action } from "@/components/ui/action";
import { SQUARE } from "@/lib/content";

/**
 * The page closes where it opened: the four squares, at full architectural
 * scale, with the two things a visitor most plausibly wants next.
 */
export function Closing() {
  return (
    <section
      aria-labelledby="closing-heading"
      className="on-deep border-b border-deep-line bg-deep"
    >
      <div className="mx-auto max-w-[100rem] px-gutter py-20 md:px-8 lg:py-32">
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <h2
              id="closing-heading"
              className="t-display text-[clamp(2rem,6.5vw,4.5rem)] text-white"
            >
              Comece pelo que sua organização precisa resolver.
            </h2>
            <div
              data-reveal
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Action
                href="https://www.microsoft.com/pt-br/microsoft-cloud"
                variant="inverse"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explorar soluções
              </Action>
              <Action
                href="https://support.microsoft.com/pt-br/contactus"
                variant="quiet"
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com a Microsoft
              </Action>
            </div>
          </div>

          <div
            data-reveal
            className="col-span-12 lg:col-span-4 lg:col-start-9"
            aria-hidden="true"
          >
            <div className="grid w-full max-w-[18rem] grid-cols-2 gap-2 lg:ml-auto lg:max-w-[22rem] lg:gap-3">
              {(Object.keys(SQUARE) as (keyof typeof SQUARE)[]).map((k) => (
                <span
                  key={k}
                  className="block aspect-square w-full"
                  style={{ backgroundColor: SQUARE[k] }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
