import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { ChangeLogType } from "@/types/changeLogType";
import showToast from "./common/Toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useAppStore } from "@/store/appStore";
import { isCategory, isItemType, isStatus } from "@/lib/utils";

const NewChangeLogDialog = () => {
  const [form, setForm] = useState<Omit<ChangeLogType, "_id">>({
    title: "",
    description: "",
    category: "fix",
    status: "pending",
    itemType: "Feature",
    timestamp: new Date().toLocaleDateString(),
    author: "JD",
  });

  const {
    showNewChangeLogDialog,
    setNewChangeLogDialog,
    loadedChangeLogs,
    setLoadedChangeLogs,
  } = useAppStore();

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Used 'Key-value dependent types' patterns, read notes for more details
  const handleChange = <K extends keyof Omit<ChangeLogType, "_id">>(
    key: K,
    value: Omit<ChangeLogType, "_id">[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const createNewChangeLog = async () => {
    const newChangeLog: Omit<ChangeLogType, "_id"> = form;
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChangeLog),
      };

      const response = await fetch(`${backendURL}/api/changelogs/`, options);

      if (response.ok) {
        const result = await response.json();

        console.log("result =>", result);

        setLoadedChangeLogs([
          ...loadedChangeLogs,
          { ...newChangeLog, _id: result.data },
        ]);

        result.data && showToast({ msg: "ChangeLog created", type: "success" });
      }
    } catch (error) {
      console.log("Error creating snippet", error);
      showToast({ msg: "Error creating snippet", type: "error" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.status || !form.itemType) {
      showToast({ msg: "All fields are required!", type: "error" });
      return;
    }
    createNewChangeLog();
    showToast({ msg: "Changelog created", type: "success" });
    setForm({
      title: "",
      description: "",
      category: "fix",
      status: "pending",
      itemType: "Feature",
      timestamp: new Date().toLocaleDateString(),
      author: "JD",
    });
  };

  return (
    <Dialog open={showNewChangeLogDialog} onOpenChange={setNewChangeLogDialog}>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>
            <span>Create New changeLog</span>
            <span className="mt-2 text-xs text-orange-300/80">
              This feature will only be available to admin in future
            </span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="Enter issue or feature title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Explain the bug, fix or feature"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="space-y-1">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(val) =>
                  handleChange("category", isCategory(val) ? val : "fix")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fix">Fix</SelectItem>
                  <SelectItem value="known">Known Issue</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="v2-beyond">v2 & Beyond</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(val) =>
                  handleChange("status", isStatus(val) ? val : "pending")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-process">In Process</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Item Type</Label>
              <Select
                value={form.itemType}
                onValueChange={(val) =>
                  handleChange("itemType", isItemType(val) ? val : "Feature")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UI">UI</SelectItem>
                  <SelectItem value="UX">UX</SelectItem>
                  <SelectItem value="Logic">Logic</SelectItem>
                  <SelectItem value="Performance">Performance</SelectItem>
                  <SelectItem value="Feature">Feature</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Author</Label>
              <Input
                placeholder="Your name"
                value={form.author}
                onChange={(e) => handleChange("author", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button className="mt-2 w-full md:w-auto">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewChangeLogDialog;
