'use client';

import { useState } from 'react';
import PageTitle from '@/components/general/layout/PageTitle';
import SortableList, { DragHandle } from '@/components/general/actions/SortableList';
import type { SortableItem } from '@/components/general/actions/SortableList';
import DroppableBoard from '@/components/general/actions/DroppableBoard';
import type { BoardColumn, BoardItem } from '@/components/general/actions/DroppableBoard';
import {
  FiCheckCircle,
  FiCircle,
  FiUser,
  FiStar,
  FiZap,
  FiPlus,
  FiClock,
  FiAlertCircle,
} from 'react-icons/fi';

// ─── SortableList example data ────────────────────────────────────────────────

type Task = SortableItem & {
  label: string;
  done: boolean;
  priority: 'low' | 'medium' | 'high';
};

type TeamMember = SortableItem & {
  name: string;
  role: string;
  initials: string;
  color: string;
};

type FeatureCard = SortableItem & {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const initialTasks: Task[] = [
  { id: '1', label: 'Design system audit', done: false, priority: 'high' },
  { id: '2', label: 'Update onboarding flow', done: true, priority: 'medium' },
  { id: '3', label: 'Write component docs', done: false, priority: 'low' },
  { id: '4', label: 'Fix mobile nav bug', done: false, priority: 'high' },
  { id: '5', label: 'Accessibility review', done: false, priority: 'medium' },
];

const initialTeam: TeamMember[] = [
  { id: 'a', name: 'Abby Chen', role: 'Design Lead', initials: 'AC', color: 'bg-violet-100 text-violet-700' },
  { id: 'b', name: 'Marcus Bell', role: 'Frontend Eng', initials: 'MB', color: 'bg-blue-100 text-blue-700' },
  { id: 'c', name: 'Sofia Ruiz', role: 'Product Manager', initials: 'SR', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'd', name: 'James Park', role: 'Backend Eng', initials: 'JP', color: 'bg-amber-100 text-amber-700' },
];

const initialCards: FeatureCard[] = [
  { id: 'x', title: 'Fast', description: 'Optimized for speed with minimal re-renders.', icon: <FiZap className="h-5 w-5 text-amber-500" /> },
  { id: 'y', title: 'Accessible', description: 'Full keyboard support and ARIA attributes.', icon: <FiStar className="h-5 w-5 text-violet-500" /> },
  { id: 'z', title: 'Flexible', description: 'Vertical, horizontal, or grid layouts.', icon: <FiUser className="h-5 w-5 text-blue-500" /> },
];

const priorityStyles: Record<Task['priority'], string> = {
  high: 'bg-red-50 text-red-600',
  medium: 'bg-amber-50 text-amber-600',
  low: 'bg-gray-100 text-gray-500',
};

// ─── Kanban data ──────────────────────────────────────────────────────────────

type KanbanCard = BoardItem & {
  title: string;
  tag: string;
  tagColor: string;
  assignee: string;
  assigneeColor: string;
  dueLabel?: string;
  urgent?: boolean;
};

type KanbanColumn = BoardColumn<KanbanCard>;

const initialKanbanColumns: KanbanColumn[] = [
  {
    id: 'backlog',
    header: null,
    items: [
      { id: 'k1', columnId: 'backlog', title: 'Audit color token usage', tag: 'Design', tagColor: 'bg-violet-100 text-violet-700', assignee: 'AC', assigneeColor: 'bg-violet-200 text-violet-700' },
      { id: 'k2', columnId: 'backlog', title: 'Set up Storybook', tag: 'Dev', tagColor: 'bg-blue-100 text-blue-700', assignee: 'MB', assigneeColor: 'bg-blue-200 text-blue-700', dueLabel: 'May 3' },
      { id: 'k3', columnId: 'backlog', title: 'Define spacing scale', tag: 'Design', tagColor: 'bg-violet-100 text-violet-700', assignee: 'AC', assigneeColor: 'bg-violet-200 text-violet-700' },
    ],
  },
  {
    id: 'in-progress',
    header: null,
    items: [
      { id: 'k4', columnId: 'in-progress', title: 'Button component', tag: 'Dev', tagColor: 'bg-blue-100 text-blue-700', assignee: 'MB', assigneeColor: 'bg-blue-200 text-blue-700', dueLabel: 'Apr 30', urgent: true },
      { id: 'k5', columnId: 'in-progress', title: 'Component library docs', tag: 'Docs', tagColor: 'bg-emerald-100 text-emerald-700', assignee: 'SR', assigneeColor: 'bg-emerald-200 text-emerald-700', dueLabel: 'May 1' },
    ],
  },
  {
    id: 'review',
    header: null,
    items: [
      { id: 'k6', columnId: 'review', title: 'Form field components', tag: 'Dev', tagColor: 'bg-blue-100 text-blue-700', assignee: 'JP', assigneeColor: 'bg-amber-200 text-amber-700', dueLabel: 'Apr 29' },
    ],
  },
  {
    id: 'done',
    header: null,
    items: [
      { id: 'k7', columnId: 'done', title: 'Icon library setup', tag: 'Dev', tagColor: 'bg-blue-100 text-blue-700', assignee: 'MB', assigneeColor: 'bg-blue-200 text-blue-700' },
      { id: 'k8', columnId: 'done', title: 'Tailwind config', tag: 'Dev', tagColor: 'bg-blue-100 text-blue-700', assignee: 'JP', assigneeColor: 'bg-amber-200 text-amber-700' },
    ],
  },
];

const columnMeta: Record<string, { label: string; accent: string; dot: string }> = {
  backlog:      { label: 'Backlog',     accent: 'text-gray-500',    dot: 'bg-gray-400'    },
  'in-progress':{ label: 'In Progress', accent: 'text-blue-600',    dot: 'bg-blue-500'    },
  review:       { label: 'In Review',   accent: 'text-amber-600',   dot: 'bg-amber-500'   },
  done:         { label: 'Done',        accent: 'text-emerald-600', dot: 'bg-emerald-500' },
};

function ColumnHeader({ colId, count }: { colId: string; count: number }) {
  const meta = columnMeta[colId];
  return (
    <div className="flex items-center justify-between px-1 pb-1">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
        <span className={`text-sm font-semibold ${meta.accent}`}>{meta.label}</span>
      </div>
      <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-500">
        {count}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DndPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [cards, setCards] = useState<FeatureCard[]>(initialCards);
  const [kanbanColumns, setKanbanColumns] = useState<KanbanColumn[]>(initialKanbanColumns);

  return (
    <>
      <PageTitle title="DRAG & DROP EXAMPLES" />
      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-8">

          {/* ── 1: Vertical task list with drag handles ── */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Vertical List — Drag Handle</h2>
            <p className="text-sm text-gray-600">
              The default layout. Each row exposes a{' '}
              <code className="rounded bg-gray-100 px-1">dragHandleProps</code> object — spread it
              onto your handle element (here, the{' '}
              <code className="rounded bg-gray-100 px-1">{'<DragHandle />'}</code> icon on the left).
            </p>
            <SortableList
              items={tasks}
              onReorder={setTasks}
              renderItem={(task, dragHandleProps) => (
                <div className="flex items-center gap-3 rounded-lg border bg-gray-50 px-4 py-3 transition-colors hover:bg-white">
                  <DragHandle {...dragHandleProps} />
                  <button
                    onClick={() =>
                      setTasks((prev) =>
                        prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)),
                      )
                    }
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                    aria-label={task.done ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {task.done ? (
                      <FiCheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <FiCircle className="h-5 w-5" />
                    )}
                  </button>
                  <span className={`flex-1 text-sm font-medium ${task.done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {task.label}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${priorityStyles[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
              )}
            />
          </div>

          {/* ── 2: Whole-item drag ── */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Vertical List — Drag Whole Item</h2>
            <p className="text-sm text-gray-600">
              Pass <code className="rounded bg-gray-100 px-1">dragWholeItem</code> so the entire
              card acts as the drag target. Good when there&apos;s no natural handle location.
            </p>
            <SortableList
              items={team}
              onReorder={setTeam}
              dragWholeItem
              renderItem={(member) => (
                <div className="flex items-center gap-4 rounded-lg border bg-gray-50 px-4 py-3 select-none">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${member.color}`}>
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
              )}
            />
          </div>

          {/* ── 3: Horizontal ── */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Horizontal List</h2>
            <p className="text-sm text-gray-600">
              Pass <code className="rounded bg-gray-100 px-1">direction=&quot;horizontal&quot;</code>.
              Great for ordered tags, steps, or priority queues.
            </p>
            <SortableList
              items={team}
              onReorder={setTeam}
              direction="horizontal"
              dragWholeItem
              renderItem={(member) => (
                <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold select-none cursor-grab active:cursor-grabbing border ${member.color}`}>
                  <span>{member.initials}</span>
                  <span>{member.name.split(' ')[0]}</span>
                </div>
              )}
            />
          </div>

          {/* ── 4: Grid ── */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Grid Layout</h2>
            <p className="text-sm text-gray-600">
              Pass <code className="rounded bg-gray-100 px-1">direction=&quot;grid&quot;</code> for
              free 2-D dragging. Combine with your own grid class via{' '}
              <code className="rounded bg-gray-100 px-1">className</code>.
            </p>
            <SortableList
              items={cards}
              onReorder={setCards}
              direction="grid"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              dragWholeItem
              renderItem={(card) => (
                <div className="flex flex-col gap-2 rounded-xl border bg-gray-50 p-5 select-none cursor-grab active:cursor-grabbing hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-2">
                    {card.icon}
                    <span className="font-semibold text-gray-800">{card.title}</span>
                  </div>
                  <p className="text-sm text-gray-500">{card.description}</p>
                </div>
              )}
            />
          </div>

          {/* ── 5: Locked axis ── */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Locked Vertical Axis</h2>
            <p className="text-sm text-gray-600">
              Pass <code className="rounded bg-gray-100 px-1">lockAxis</code> to constrain movement
              to the vertical axis only — useful inside modals or sidebars where horizontal overflow
              would look broken.
            </p>
            <SortableList
              items={tasks}
              onReorder={setTasks}
              lockAxis
              renderItem={(task, dragHandleProps) => (
                <div className="flex items-center gap-3 rounded-lg border bg-gray-50 px-4 py-3">
                  <DragHandle {...dragHandleProps} />
                  <span className="flex-1 text-sm font-medium text-gray-700">{task.label}</span>
                </div>
              )}
            />
          </div>

          {/* ── 6: Kanban board ── */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Kanban Board — Cross-Column Drag</h2>
            <p className="text-sm text-gray-600">
              Uses <code className="rounded bg-gray-100 px-1">{'<DroppableBoard />'}</code> — a
              separate component built on{' '}
              <code className="rounded bg-gray-100 px-1">useDroppable</code>. Cards reorder within a
              column <em>and</em> move across columns live. Columns highlight on hover; empty columns
              show a drop target. The footer slot wires up an &ldquo;Add card&rdquo; button for free.
            </p>

            <div className="-mx-2 overflow-x-auto px-2 pb-2">
              <DroppableBoard
                columns={kanbanColumns.map((col) => ({
                  ...col,
                  header: <ColumnHeader colId={col.id as string} count={col.items.length} />,
                }))}
                onColumnsChange={setKanbanColumns}
                dragWholeItem
                renderItem={(card) => (
                  <div className="group rounded-lg border bg-white p-3 shadow-sm transition-shadow hover:shadow-md select-none cursor-grab active:cursor-grabbing">
                    {/* Tag row */}
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${card.tagColor}`}>
                        {card.tag}
                      </span>
                      {card.urgent && (
                        <span className="flex items-center gap-0.5 rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">
                          <FiAlertCircle className="h-3 w-3" />
                          Urgent
                        </span>
                      )}
                    </div>
                    {/* Title */}
                    <p className="mb-3 text-sm font-medium text-gray-800 leading-snug">
                      {card.title}
                    </p>
                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      {card.dueLabel ? (
                        <span className={`flex items-center gap-1 text-xs ${card.urgent ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                          <FiClock className="h-3 w-3" />
                          {card.dueLabel}
                        </span>
                      ) : (
                        <span />
                      )}
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${card.assigneeColor}`}>
                        {card.assignee}
                      </div>
                    </div>
                  </div>
                )}
                renderColumnFooter={(col) => (
                  <button
                    className="flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
                    onClick={() => {
                      const newCard: KanbanCard = {
                        id: `k-${Date.now()}`,
                        columnId: col.id,
                        title: 'New card',
                        tag: 'Dev',
                        tagColor: 'bg-blue-100 text-blue-700',
                        assignee: '?',
                        assigneeColor: 'bg-gray-200 text-gray-500',
                      };
                      setKanbanColumns((prev) =>
                        prev.map((c) =>
                          c.id === col.id ? { ...c, items: [...c.items, newCard] } : c,
                        ),
                      );
                    }}
                  >
                    <FiPlus className="h-3.5 w-3.5" />
                    Add card
                  </button>
                )}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}