const data = [
  {
    id: "b5ea640f-b60a-4f61-9afb-1d90d624eaac",
    organizationId: "2929ea4f-4d39-422e-9801-d4afe8fee734",
    taskId: "e2304dc6-bb3c-48b7-bee8-efe10ea96aac",
    userId: "f29277c0-93fe-4277-a30e-e6992f253f04",
    type: "status_change",
    fromStatus: "todo",
    toStatus: "in_progress",
    timeSpentMinutes: null,
    createdAt: "2025-12-25T20:09:39.701Z",
    user: { id: "f29277c0-93fe-4277-a30e-e6992f253f04", name: "demoUser" },
  },
  {
    id: "68f7aaa6-a89e-4a70-9254-aa4d34a2b414",
    organizationId: "2929ea4f-4d39-422e-9801-d4afe8fee734",
    taskId: "e2304dc6-bb3c-48b7-bee8-efe10ea96aac",
    userId: "f29277c0-93fe-4277-a30e-e6992f253f04",
    type: "status_change",
    fromStatus: "in_progress",
    toStatus: "done",
    timeSpentMinutes: null,
    createdAt: "2025-12-25T20:18:16.245Z",
    user: { id: "f29277c0-93fe-4277-a30e-e6992f253f04", name: "demoUser" },
  },
  {
    id: "03f9d7e7-a13e-4eb2-b40d-ada6a7b724b8",
    organizationId: "2929ea4f-4d39-422e-9801-d4afe8fee734",
    taskId: "e2304dc6-bb3c-48b7-bee8-efe10ea96aac",
    userId: "f29277c0-93fe-4277-a30e-e6992f253f04",
    type: "status_change",
    fromStatus: "done",
    toStatus: "in_progress",
    timeSpentMinutes: null,
    createdAt: "2025-12-25T20:20:34.457Z",
    user: { id: "f29277c0-93fe-4277-a30e-e6992f253f04", name: "demoUser" },
  },
  {
    id: "650a4302-0212-4b35-9668-fd4f1f2af86d",
    organizationId: "2929ea4f-4d39-422e-9801-d4afe8fee734",
    taskId: "e2304dc6-bb3c-48b7-bee8-efe10ea96aac",
    userId: "f29277c0-93fe-4277-a30e-e6992f253f04",
    type: "status_change",
    fromStatus: "in_progress",
    toStatus: "done",
    timeSpentMinutes: null,
    createdAt: "2025-12-25T20:21:02.682Z",
    user: { id: "f29277c0-93fe-4277-a30e-e6992f253f04", name: "demoUser" },
  },
];
export const timelineItems = data.map((event) => ({
  title: new Date(event.createdAt).toLocaleString(),

  cardTitle: `${event.user.name} (${event.type})`,

  cardSubtitle: `Status: ${event.fromStatus} → ${event.toStatus}`,

  cardDetailedText: [
    `From: ${event.fromStatus}`,
    `To: ${event.toStatus}`,
    `Time Spent: ${
      event.timeSpentMinutes
        ? `${event.timeSpentMinutes} minutes`
        : "Not recorded"
    }`,
    `Event Type: ${event.type}`,
  ],
}));
