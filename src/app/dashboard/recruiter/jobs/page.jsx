import React from 'react';
import { getCompanyJobs } from '@/lib/api/jobs';
import { Table, Chip, Button } from "@heroui/react";
// Assuming you are using standard Lucide-react or similar package mapped to Hero UI/Gravity icons. 
// Replace these import paths with your exact gravity icon package locations if different.
import { Eye, Edit2, Trash2 } from "lucide-react"; 

const RecruiterJobs = async () => {
    const companyId = "comp_98234"; 
    const jobs = await getCompanyJobs(companyId) || [];

    // Helper to determine status color dynamically
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'success';
            case 'inactive': return 'danger';
            case 'draft': return 'warning';
            default: return 'default';
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-4">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-100">Manage Job Postings</h2>
                <p className="text-sm text-neutral-500">View, update, and monitor your active listings.</p>
            </div>

            <Table aria-label="Company jobs management table">
                <Table.ResizableContainer>
                    <Table.Content aria-label="Table with resizable columns" className="min-w-[800px]">
                        <Table.Header>
                            <Table.Column isRowHeader defaultWidth="2fr" id="jobTitle" minWidth={200}>
                                Job Title
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.2fr" id="category" minWidth={150}>
                                Category & Type
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.5fr" id="locationSalary" minWidth={180}>
                                Location & Salary
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="status" minWidth={120}>
                                Status
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.2fr" id="actions" minWidth={140}>
                                Actions
                            </Table.Column>
                        </Table.Header>

                        <Table.Body emptyContent={"No jobs found for this company."}>
                            {jobs.map((job) => {
                                // Extract unique key string from your MongoDB object format or fallback
                                const jobId = job._id?.$oid || job._id; 
                                
                                return (
                                    <Table.Row key={jobId}>
                                        {/* Job Title */}
                                        <Table.Cell>
           <span className="font-medium text-white">{job.title}</span>
                                        </Table.Cell>

                                        {/* Category & Type */}
                                        <Table.Cell>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="capitalize text-sm text-neutral-700">{job.jobCategory}</span>
                                                <span className="text-xs text-white capitalize">{job.jobType}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* Location & Salary */}
                                        <Table.Cell>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm text-neutral-300">
                                                    {job.location} {job.isRemote && <span className="text-xs text-primary-500">(Remote)</span>}
                                                </span>
                                                <span className="text-xs text-neutral-100">
                                                    {job.minSalary ? `${parseInt(job.minSalary).toLocaleString()} - ${parseInt(job.maxSalary).toLocaleString()} ${job.currency}` : 'Not specified'}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* Status */}
                                        <Table.Cell>
                                            <Chip 
                                                color={getStatusColor(job.status)} 
                                                size="sm" 
                                                variant="soft"
                                                className="capitalize"
                                            >
                                                {job.status || 'Unknown'}
                                            </Chip>
                                        </Table.Cell>

                                        {/* Actions Column */}
                                        <Table.Cell>
                                            <div className="flex items-center gap-1">
                                                <Button 
                                                    isIconOnly 
                                                    size="sm" 
                                                    variant="light" 
                                                    aria-label="View Details"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4 text-neutral-500" />
                                                </Button>
                                                <Button 
                                                    isIconOnly 
                                                    size="sm" 
                                                    variant="light" 
                                                    aria-label="Edit Job"
                                                    title="Edit Job"
                                                >
                                                    <Edit2 className="w-4 h-4 text-blue-500" />
                                                </Button>
                                                <Button 
                                                    isIconOnly 
                                                    size="sm" 
                                                    variant="light" 
                                                    color="danger"
                                                    aria-label="Delete Job"
                                                    title="Delete Job"
                                                >
                                                    <Trash2 className="w-4 h-4 text-danger" />
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ResizableContainer>
            </Table>
        </div>
    );
};

export default RecruiterJobs;