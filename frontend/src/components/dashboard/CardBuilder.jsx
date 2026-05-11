import React, { useState } from "react";
import {
  At,
  CheckCircle,
  PencilSimple,
  Info,
  Trash,
  UploadSimple,
  EnvelopeSimple,
  Phone,
  User,
  MapPin,
  Briefcase,
  Buildings,
  Note,
  DotsThree,
  Image as ImageIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useCard } from "@/contexts/CardContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MediaCard = ({ title, image, onChange, rounded = "rounded-xl", aspect = "aspect-square" }) => (
  <div className="group relative rounded-2xl border border-border bg-card p-3 transition-all duration-300 hover:shadow-card hover:border-primary/30">
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <p className="text-[13px] font-medium text-foreground">{title}</p>
        <Info size={13} className="text-muted-foreground" />
      </div>
      <button className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
        <Trash size={14} />
      </button>
    </div>
    <div className={cn("relative w-full overflow-hidden bg-surface-muted", aspect, rounded)}>
      {image ? (
        <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="grid h-full w-full place-items-center text-muted-foreground">
          <ImageIcon size={28} />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
    <button
      onClick={onChange}
      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-[12.5px] font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
    >
      <UploadSimple size={14} weight="bold" />
      Change photo
    </button>
  </div>
);

const FieldRow = ({ icon: Icon, label, children }) => (
  <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3.5 py-2.5 transition-colors focus-within:border-primary/50 focus-within:bg-card">
    <Icon size={16} className="text-muted-foreground" />
    <span className="text-[12px] font-medium text-muted-foreground">{label}</span>
    <div className="flex-1">{children}</div>
  </div>
);

export const CardBuilder = () => {
  const { card, updateField } = useCard();
  const [handle, setHandle] = useState(card.handle);
  const [handleValid] = useState(true);

  const onSave = () => {
    updateField("handle", handle);
    toast.success("Card updated successfully", {
      description: "Your changes are live at " + handle + ".bitcard.app",
    });
  };

  const onCancel = () => {
    setHandle(card.handle);
    toast("Changes discarded");
  };

  const charCount = card.bio.length;

  return (
    <div className="mx-auto w-full max-w-3xl animate-fade-up">
      {/* Header card */}
      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-[22px] font-semibold tracking-tight text-foreground">
                Card Builder Workspace
              </h1>
              <Badge
                variant="secondary"
                className="h-6 rounded-full border-0 bg-success-soft px-2.5 text-[11px] font-semibold text-success"
              >
                <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" />
                Live
              </Badge>
            </div>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              Customize your digital business card
            </p>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <DotsThree size={20} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-8 px-6 py-6">
          {/* Handle */}
          <section>
            <div className="grid gap-4 sm:grid-cols-[200px_1fr] sm:items-start">
              <div>
                <p className="text-[13.5px] font-semibold text-foreground">Your unique handle</p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">
                  This will be your custom URL
                </p>
              </div>
              <div>
                <div className="flex items-stretch overflow-hidden rounded-xl border border-border bg-surface transition-colors focus-within:border-primary/50 focus-within:bg-card">
                  <div className="flex items-center pl-3 pr-1 text-muted-foreground">
                    <At size={16} weight="bold" />
                  </div>
                  <input
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-[14px] font-medium text-foreground outline-none placeholder:text-muted-foreground"
                    placeholder="yourhandle"
                  />
                  <div className="flex items-center gap-1.5 border-l border-border bg-surface-muted px-3 text-[13px] text-muted-foreground">
                    .bitcard.app
                  </div>
                  <div className="flex items-center px-2.5">
                    {handleValid ? (
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-success-soft text-success">
                        <CheckCircle size={14} weight="fill" />
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <a
                    href={`https://${handle}.bitcard.app`}
                    onClick={(e) => e.preventDefault()}
                    className="truncate text-[12.5px] font-medium text-primary hover:underline"
                  >
                    bitcard.app/{handle}
                  </a>
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                    <PencilSimple size={12} weight="bold" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="h-px w-full bg-border" />

          {/* Media */}
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-[13.5px] font-semibold text-foreground">Media</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">
                  Upload images to personalize your card
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
                <Info size={13} />
                <span>PNG, JPG up to 5MB</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <MediaCard
                title="Profile Picture"
                image={card.profilePicture}
                rounded="rounded-full"
                onChange={() => toast("Upload dialog", { description: "This would open an upload dialog" })}
              />
              <MediaCard
                title="Cover Photo"
                image={card.coverPhoto}
                aspect="aspect-[4/3]"
                rounded="rounded-lg"
                onChange={() => toast("Upload dialog", { description: "This would open an upload dialog" })}
              />
              <div className="group relative rounded-2xl border border-border bg-card p-3 transition-all duration-300 hover:shadow-card hover:border-primary/30">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] font-medium text-foreground">Company Logo</p>
                    <Info size={13} className="text-muted-foreground" />
                  </div>
                  <button className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                    <Trash size={14} />
                  </button>
                </div>
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-primary">
                  <div className="absolute inset-0 grid place-items-center text-primary-foreground">
                    <div className="text-center">
                      <div className="mx-auto mb-1.5 grid h-12 w-12 place-items-center rounded-xl bg-card/15 backdrop-blur">
                        <span className="font-display text-xl font-bold">{"{B}"}</span>
                      </div>
                      <p className="font-display text-[11px] font-semibold leading-tight">
                        Bitcode<br />Infotech
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toast("Upload dialog")}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-[12.5px] font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
                >
                  <UploadSimple size={14} weight="bold" />
                  Change logo
                </button>
              </div>
            </div>
          </section>

          <div className="h-px w-full bg-border" />

          {/* Contact */}
          <section>
            <div className="mb-4">
              <p className="text-[13.5px] font-semibold text-foreground">Contact Information</p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">How people will reach you</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FieldRow icon={EnvelopeSimple} label="Email">
                <Input
                  value={card.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="h-7 border-0 bg-transparent p-0 text-[13.5px] font-medium text-foreground shadow-none focus-visible:ring-0"
                />
              </FieldRow>
              <FieldRow icon={Phone} label="Phone">
                <Input
                  value={card.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="h-7 border-0 bg-transparent p-0 text-[13.5px] font-medium text-foreground shadow-none focus-visible:ring-0"
                />
              </FieldRow>
              <FieldRow icon={User} label="Name">
                <Input
                  value={card.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="h-7 border-0 bg-transparent p-0 text-[13.5px] font-medium text-foreground shadow-none focus-visible:ring-0"
                />
              </FieldRow>
              <FieldRow icon={MapPin} label="Location">
                <Input
                  value={card.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  className="h-7 border-0 bg-transparent p-0 text-[13.5px] font-medium text-foreground shadow-none focus-visible:ring-0"
                />
              </FieldRow>
              <FieldRow icon={Briefcase} label="Job Title">
                <Input
                  value={card.jobTitle}
                  onChange={(e) => updateField("jobTitle", e.target.value)}
                  className="h-7 border-0 bg-transparent p-0 text-[13.5px] font-medium text-foreground shadow-none focus-visible:ring-0"
                />
              </FieldRow>
              <FieldRow icon={Buildings} label="Company">
                <Input
                  value={card.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  className="h-7 border-0 bg-transparent p-0 text-[13.5px] font-medium text-foreground shadow-none focus-visible:ring-0"
                />
              </FieldRow>
            </div>

            <div className="mt-3">
              <div className="rounded-xl border border-border bg-surface px-3.5 py-3 transition-colors focus-within:border-primary/50 focus-within:bg-card">
                <div className="mb-1.5 flex items-center gap-2">
                  <Note size={16} className="text-muted-foreground" />
                  <span className="text-[12px] font-medium text-muted-foreground">Bio</span>
                </div>
                <Textarea
                  value={card.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  maxLength={260}
                  className="min-h-[80px] resize-none border-0 bg-transparent p-0 text-[13.5px] font-medium text-foreground shadow-none focus-visible:ring-0"
                />
                <div className="mt-1 flex justify-end text-[11.5px] text-muted-foreground">
                  {charCount} / 260
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2.5 border-t border-border bg-surface px-6 py-4">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="h-10 rounded-lg border border-border bg-card px-4 text-[13.5px] font-medium text-foreground hover:bg-secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            className="h-10 rounded-lg bg-gradient-primary px-5 text-[13.5px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.02] hover:opacity-95"
          >
            <CheckCircle size={16} weight="fill" className="mr-1.5" />
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};
