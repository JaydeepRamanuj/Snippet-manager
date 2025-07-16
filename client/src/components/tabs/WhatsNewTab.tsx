import { ScrollArea } from "../ui/scroll-area";

function WhatsNewTab() {
  return (
    <ScrollArea className="flex h-full flex-col overflow-auto p-3">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">🚀 What’s New in v1.2</h2>
        <ul className="text-muted-foreground list-inside list-disc space-y-2 text-sm">
          <li>
            <span className="text-primary font-medium">Mobile Responsive</span>{" "}
            – Now website is mobile responsive, though it is still recommended
            to use on larger screen because on mobile shortcuts and editors will
            not work properly
          </li>
          <li>
            <span className="text-primary font-medium">Reset Password</span> –
            Now user will be able to reset password by tapping on forgot
            password and verifying OTP.
          </li>
          <li>
            <span className="text-primary font-medium">
              Multiple shortcut support
            </span>
            – Now multiple shortcut keys can be added for single operation. Now
            to open search menu you can use{" "}
            <kbd className="rounded-md border bg-black/10 px-2 py-1 font-mono text-xs font-semibold">
              Ctrl + p
            </kbd>{" "}
            as well as
            <kbd className="ml-1 rounded-md border bg-black/10 px-2 py-1 font-mono text-xs font-semibold">
              Ctrl + k
            </kbd>
          </li>
        </ul>
        <h2 className="text-lg font-semibold">🚀 What’s New in v1.1</h2>
        <ul className="text-muted-foreground list-inside list-disc space-y-2 text-sm">
          <li>
            <span className="text-primary font-medium">Dynamic ChangeLogs</span>{" "}
            – Now powered by updated backend API.
          </li>
          <li>
            <span className="text-primary font-medium">Changelog Form</span> –
            Add entries changlog entries using form (This will be removed in
            upcoming releases and will only be available to Admin account).
          </li>
        </ul>
      </div>
    </ScrollArea>
  );
}

export default WhatsNewTab;
