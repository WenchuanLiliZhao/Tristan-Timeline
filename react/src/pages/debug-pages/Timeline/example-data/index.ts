import type { BaseTimelineItemType } from "../../../../design-system/ui-demos";
import { getRainbowColor } from "../../../../styles";
import { Example_Issues_1 } from "./_example1";
import { Example_Issues_2 } from "./_example2";
import { Example_Issues_3 } from "./_example3";


export const status = {
  high: {
    name: "High",
    color: getRainbowColor('rose')
  },
  medium: {
    name: "Medium",
    color: getRainbowColor('amber')
  },
  low: {
    name: "Low",
    color: getRainbowColor('emerald')
  }
}

export const team = {
  sales: {
    name: "Sales",
    color: getRainbowColor('blue')
  },
  marketing: {
    name: "Marketing",
    color: getRainbowColor('emerald')
  },
  engineering: {
    name: "Engineering Team Approval",
    color: "var(--color--semantic-active)"
  },
  design: {
    name: "Design",
    color: getRainbowColor('orange')
  },
  product: {
    name: "Product",
    color: getRainbowColor('pink')
  },
  other: {
    name: "Other",
    color: getRainbowColor('cyan')
  }
}

export const priority = {
  high: {
    name: "High",
    color: getRainbowColor('rose'),
    icon: "stat_2"
  },
  medium: {
    name: "Medium",
    color: getRainbowColor('blue'),
    icon: "stat_1"
  },
  low: {
    name: "Low",
    color: getRainbowColor('emerald'),
    icon: "stat_minus_1"
  }
}

export const riskLevel = {
  high: {
    name: "High Risks",
    color: getRainbowColor('rose'),
  },
  medium: {
    name: "Medium Risks",
    color: getRainbowColor('amber'),
  },
  low: {
    name: "Low Risks",
    color: getRainbowColor('emerald'),
  }
}

export interface ProjectDataType extends BaseTimelineItemType {
  projectKey: string;
  status: keyof typeof status
  progress: number
  team: keyof typeof team
  priority: keyof typeof priority
  category: string
  riskLevel: keyof typeof riskLevel
}

export const ExampleData: ProjectDataType[] = [
  ...Example_Issues_1,
  ...Example_Issues_2,
  ...Example_Issues_3
]