export type AudienceTag = 'school' | 'student' | 'specialist' | 'all';
export type OpportunityType = 'grant' | 'contest' | 'education' | 'internship' | 'forum';
export type Category = 'science' | 'volunteer' | 'business' | 'creative';

export interface Opportunity {
  id: number;
  name: string;
  description: string;
  importance: string;
  organizer: string;
  audience: AudienceTag[];
  type: OpportunityType;
  category: Category;
  website?: string;
}

export interface Term {
  id: number;
  name: string;
  definition: string;
}

export interface UsefulLink {
  id: number;
  name: string;
  description: string;
  url: string;
  group: 'main' | 'volunteer' | 'education';
}

export const AUDIENCE_LABELS: Record<AudienceTag, string> = {
  school: 'Школьникам',
  student: 'Студентам',
  specialist: 'Специалистам',
  all: 'Всем',
};

export const TYPE_LABELS: Record<OpportunityType, string> = {
  grant: 'Грант',
  contest: 'Конкурс',
  education: 'Обучение',
  internship: 'Стажировка',
  forum: 'Форум',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  science: 'Наука и IT',
  volunteer: 'Волонтёрство',
  business: 'Бизнес и управление',
  creative: 'Творчество',
};

export const TYPE_COLORS: Record<OpportunityType, string> = {
  grant:      'bg-emerald-950/70 text-emerald-400',
  contest:    'bg-amber-950/70 text-amber-400',
  education:  'bg-sky-950/70 text-sky-400',
  internship: 'bg-violet-950/70 text-violet-400',
  forum:      'bg-blue-950/70 text-blue-400',
};

export const AUDIENCE_COLORS: Record<AudienceTag, string> = {
  school:     'bg-lime-950/70 text-lime-400',
  student:    'bg-cyan-950/70 text-cyan-400',
  specialist: 'bg-orange-950/70 text-orange-400',
  all:        'bg-white/10 text-ink-muted',
};
