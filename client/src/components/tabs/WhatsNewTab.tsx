function WhatsNewTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">🚀 What’s New in v1.1</h2>
      <ul className="list-disc list-inside text-muted-foreground text-sm space-y-2">
        <li>
          <span className="font-medium text-primary">Dynamic ChangeLogs</span> –
          Now powered by updated backend API.
        </li>
        <li>
          <span className="font-medium text-primary">Changelog Form</span> – Add
          entries changlog entries using form (This will be removed in upcoming
          releases and will only be available to Admin account).
        </li>
      </ul>
    </div>
  );
}

export default WhatsNewTab;
