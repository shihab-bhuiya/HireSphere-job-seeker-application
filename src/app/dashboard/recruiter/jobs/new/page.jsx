/** @format */
"use client";
import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  Select,
  ListBox,
  Button,
  Switch,
  FieldError,
  Toast,
} from "@heroui/react";
import toast from "react-hot-toast";
import { createJob } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";

export default function PostJobForm() {
  // Recruiter authorization state
  const mockCompany = {
    id: "comp_98234",
    name: "Sparkon",
    isApproved: true,
    plan: "Free",
    activeJobsCount: 1,
    jobLimits: { Free: 3, Growth: 10, Enterprise: 50 },
  };

  // Select States (to capture primitive choices for native Form submission)
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [isRemote, setIsRemote] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [requirements, setRequirements] = useState("");

// 2. Inside your handleSubmit function, make sure you clean up whitespace:
let validationErrors = {};
if (!requirements.trim()) {
  validationErrors.requirements = "Job Requirements are required.";
}

  const currentLimit = mockCompany.jobLimits[mockCompany.plan];
  const isLimitReached = mockCompany.activeJobsCount >= currentLimit;
  const canPost = mockCompany.isApproved && !isLimitReached;

  // Custom theme mapping following your dark style guide
  const customInputStyles =
    "bg-zinc-900/80 border border-zinc-800/80 hover:bg-zinc-800/50 text-zinc-100 rounded-xl px-3 py-2 text-sm focus:border-zinc-500 transition-colors w-full";
  const customSelectTriggerStyles =
    "w-full bg-zinc-900/80 border border-zinc-800/80 text-zinc-100 rounded-xl h-10 px-3 hover:bg-zinc-800/50 transition-colors text-sm text-left flex items-center justify-between cursor-pointer";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canPost) return;

    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    let validationErrors = {};
    if (!data.title) validationErrors.title = "Job Title is required.";
    if (!data.category) validationErrors.category = "Job Category is required.";
    if (!data.jobType) validationErrors.jobType = "Job Type is required.";
    if (!data.minSalary)
      validationErrors.minSalary = "Minimum pay is required.";
    if (!data.maxSalary)
      validationErrors.maxSalary = "Maximum pay is required.";
    if (!isRemote && !data.location)
      validationErrors.location = "Office location is required.";
    if (!data.deadline)
      validationErrors.deadline = "Application deadline is required.";
    if (!data.description)
      validationErrors.description = "Job Description is required.";
    if (!data.requirements)
      validationErrors.requirements = "Job Requirements are required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const finalPayload = {
      ...data,
      isRemote,
      companyId: mockCompany.id,
      status: "active",
      createdAt: new Date().toISOString(),
    };
    console.log("Saving job configuration:", finalPayload);

    const res = await createJob(finalPayload);
    if(res.insertedId)
{
      toast.success("Job posted successfully with active status!");
}

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast.success("Job posted successfully with active status!");
    redirect("/dashboard/recruiter/jobs");
  };

  return (
    <div className="min-h-screen  bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-3xl container mx-auto bg-[#121214] border border-zinc-800/60 rounded-xl shadow-2xl overflow-hidden">
        {/* Header Block */}
        <div className="px-8 pt-8 pb-6 border-b border-zinc-850">
          <h1 className="text-xl font-semibold tracking-wide text-zinc-100">
            Create a New Job Posting
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Posting as:{" "}
            <span className="text-zinc-200 font-medium">
              {mockCompany.name}
            </span>{" "}
            ({mockCompany.plan} Plan)
          </p>

          {isLimitReached && (
            <div className="mt-4 p-3 bg-rose-950/40 border border-rose-900/50 rounded-lg text-rose-300 text-xs">
              Active job posting ceiling reached ({mockCompany.activeJobsCount}/
              {currentLimit} jobs). Upgrade your plan to publish.
            </div>
          )}
        </div>

        {/* Core Form Module */}
        <Form
          validationErrors={errors}
          onSubmit={handleSubmit}
          className="p-8 space-y-8">
          {/* SECTION 1: JOB DETAILS */}
          <Fieldset>
            <Label className="text-zinc-400 font-medium text-xs tracking-wider uppercase block mb-4">
              Job Information
            </Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <TextField isInvalid={!!errors.title} className="w-full">
                <Label className="text-zinc-200 font-medium text-sm mb-1 block">
                  Job Title
                </Label>
                <Input
                  name="title"
                  placeholder="e.g. Senior Software Engineer"
                  className={customInputStyles}
                 
                />
                <FieldError className="text-xs text-rose-400 mt-1">
                  {errors.title}
                </FieldError>
              </TextField>

              {/* Job Category Select Box */}
              <div className="flex flex-col">
                <Select
                  className="w-full"
                  placeholder="Select industry"
                  disabled={!canPost}
                  selectedKey={category}
                  onSelectionChange={(key) => setCategory(key)}>
                  <Label className="text-zinc-200 font-medium text-sm mb-1 block">
                    Job Category
                  </Label>
                  <Select.Trigger className={customSelectTriggerStyles}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl text-zinc-200 w-full max-w-xs">
                    <ListBox className="p-1">
                      <ListBox.Item
                        id="tech"
                        textValue="Technology & Engineering"
                        className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer text-sm flex items-center justify-between">
                        Technology & Engineering
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        id="design"
                        textValue="UI/UX & Product Design"
                        className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer text-sm flex items-center justify-between">
                        UI/UX & Product Design
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        id="marketing"
                        textValue="Growth & Marketing"
                        className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer text-sm flex items-center justify-between">
                        Growth & Marketing
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
                <input type="hidden" name="category" value={category} />
                {errors.category && (
                  <span className="text-xs text-rose-400 mt-1">
                    {errors.category}
                  </span>
                )}
              </div>

              {/* Job Type Select Box */}
              <div className="flex flex-col">
                <Select
                  className="w-full"
                  placeholder="Select arrangement"
                  disabled={!canPost}
                  selectedKey={jobType}
                  onSelectionChange={(key) => setJobType(key)}>
                  <Label className="text-zinc-200 font-medium text-sm mb-1 block">
                    Job Type
                  </Label>
                  <Select.Trigger className={customSelectTriggerStyles}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl text-zinc-200 w-full max-w-xs">
                    <ListBox className="p-1">
                      <ListBox.Item
                        id="full-time"
                        textValue="Full-time"
                        className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer text-sm flex items-center justify-between">
                        Full-time
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        id="part-time"
                        textValue="Part-time"
                        className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer text-sm flex items-center justify-between">
                        Part-time
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        id="contract"
                        textValue="Contract"
                        className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer text-sm flex items-center justify-between">
                        Contract
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        id="internship"
                        textValue="Internship"
                        className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer text-sm flex items-center justify-between">
                        Internship
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
                <input type="hidden" name="jobType" value={jobType} />
                {errors.jobType && (
                  <span className="text-xs text-rose-400 mt-1">
                    {errors.jobType}
                  </span>
                )}
              </div>

              <TextField isInvalid={!!errors.deadline} className="w-full">
                <Label className="text-zinc-200 font-medium text-sm mb-1 block">
                  Application Deadline
                </Label>
                <Input
                  name="deadline"
                  type="date"
                  className={customInputStyles}
              
                />
                <FieldError className="text-xs text-rose-400 mt-1">
                  {errors.deadline}
                </FieldError>
              </TextField>

              {/* Currency & Salary Layout */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div className="flex flex-col">
                  <Select
                    className="w-full"
                    disabled={!canPost}
                    selectedKey={currency}
                    onSelectionChange={(key) => setCurrency(key)}>
                    <Label className="text-zinc-200 font-medium text-sm mb-1 block">
                      Currency
                    </Label>
                    <Select.Trigger className={customSelectTriggerStyles}>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl text-zinc-200 w-full max-w-xs">
                      <ListBox className="p-1">
                        <ListBox.Item
                          id="USD"
                          textValue="USD"
                          className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer text-sm flex items-center justify-between">
                          USD ($)
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item
                          id="EUR"
                          textValue="EUR"
                          className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer text-sm flex items-center justify-between">
                          EUR (€)
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item
                          id="BDT"
                          textValue="BDT"
                          className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer text-sm flex items-center justify-between">
                          BDT (৳)
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                  <input type="hidden" name="currency" value={currency} />
                </div>

                <TextField isInvalid={!!errors.minSalary} className="w-full">
                  <Label className="text-zinc-200 font-medium text-sm mb-1 block">
                    Minimum Pay
                  </Label>
                  <Input
                    name="minSalary"
                    type="number"
                    placeholder="Min amount"
                    className={customInputStyles}
                    
                  />
                  <FieldError className="text-xs text-rose-400 mt-1">
                    {errors.minSalary}
                  </FieldError>
                </TextField>

                <TextField isInvalid={!!errors.maxSalary} className="w-full">
                  <Label className="text-zinc-200 font-medium text-sm mb-1 block">
                    Maximum Pay
                  </Label>
                  <Input
                    name="maxSalary"
                    type="number"
                    placeholder="Max amount"
                    className={customInputStyles}
                  
                  />
                  <FieldError className="text-xs text-rose-400 mt-1">
                    {errors.maxSalary}
                  </FieldError>
                </TextField>
              </div>

              {/* Location Toggle Component */}
              {/* Location Toggle Component with explicit structural layout */}
<div className="md:col-span-2 bg-zinc-900/30 border border-zinc-800/40 p-4 rounded-xl">
  <Switch 
    isSelected={isRemote} 
    onChange={(isSelected) => setIsRemote(isSelected)}
    
    className="flex items-center justify-between w-full cursor-pointer group"
  >
    <Switch.Control className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out border border-zinc-700 ${isRemote ? "bg-zinc-100" : "bg-zinc-800"}`}>
      <Switch.Thumb className={`w-3.5 h-3.5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out block ${isRemote ? "translate-x-4 bg-zinc-950" : "translate-x-0 bg-zinc-400"}`} />
    </Switch.Control>
    
    <Switch.Content>
      <div className="flex flex-col gap-0.5 pointer-events-none">
        <Label className="text-sm font-medium text-zinc-200 cursor-pointer">Remote Position</Label>
        <span className="text-xs text-zinc-400">Will candidates operate entirely out-of-office?</span>
      </div>
    </Switch.Content>
  </Switch>
</div> 

              {!isRemote && (
                <TextField
                  isInvalid={!!errors.location}
                  className="md:col-span-2">
                  <Label className="text-zinc-200 font-medium text-sm mb-1 block">
                    Office Location
                  </Label>
                  <Input
                    name="location"
                    placeholder="City, Country"
                    className={customInputStyles}
                   
                  />
                  <FieldError className="text-xs text-rose-400 mt-1">
                    {errors.location}
                  </FieldError>
                </TextField>
              )}
            </div>
          </Fieldset>

          {/* SECTION 2: SPECIFICATIONS */}
          <Fieldset>
            <Label className="text-zinc-400 font-medium text-xs tracking-wider uppercase block mb-4">
              Job Specifications
            </Label>

            <div className="space-y-5 w-full">
              <TextField isInvalid={!!errors.description} className="w-full">
                <Label className="text-zinc-200 font-medium text-sm mb-1 block">
                  Role Summary & Responsibilities
                </Label>
                <TextArea
                  name="description"
                  placeholder="Outline core functions and daily operations..."
                  rows={4}
                  className={customInputStyles}
             
                />
                <FieldError className="text-xs text-rose-400 mt-1">
                  {errors.description}
                </FieldError>
              </TextField>

            <TextField 
  isInvalid={!!errors.requirements} 
  className="w-full"
>
  <Label className="text-zinc-200 font-medium text-sm mb-1 block">
    Candidate Requirements
  </Label>
  <TextArea 
    name="requirements" 
    value={requirements}
    onChange={(e) => setRequirements(e.target.value)} // Force sync state
    placeholder="List technical frameworks and stack variations..." 
    rows={4} 
    className={customInputStyles} 

  />
  <FieldError className="text-xs text-rose-400 mt-1">
    {errors.requirements}
  </FieldError>
</TextField>
              <TextField className="w-full">
                <Label className="text-zinc-200 font-medium text-sm mb-1 block">
                  Compensations & Perks (Optional)
                </Label>
                <TextArea
                  name="benefits"
                  placeholder="e.g. Healthcare setups, workspace structural allowances..."
                  rows={3}
                  className={customInputStyles}
                 
                />
              </TextField>
            </div>
          </Fieldset>

          {/* Action Footer Button Group */}
          <div className="pt-6 border-t border-zinc-850 flex items-center justify-end gap-3 w-full">
            <Button
              type="button"
              className="bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-colors rounded-lg font-medium text-sm h-10 px-4">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold px-6 h-10 rounded-lg text-sm transition-colors shadow-md disabled:opacity-40"
              isLoading={isSubmitting}
              >
              Publish Post
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
