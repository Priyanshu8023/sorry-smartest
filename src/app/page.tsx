import { Backdrop } from "@/components/ambient/Backdrop";
import { Story } from "@/components/story/Story";

export default function Home() {
  return (
    <main className="safe-pad relative isolate flex min-h-svh items-center justify-center overflow-x-clip [--pad-x:0.75rem] [--pad-y:0.75rem] short:[--pad-y:0.5rem] landscape-phone:[--pad-y:0.5rem] desk:[--pad-x:1.5rem] desk:[--pad-y:2rem]">
      <Backdrop />
      <h1 className="sr-only">A Little Sorry</h1>
      <Story />
    </main>
  );
}
