export type ChildElement =
  | React.ReactNode
  | React.ReactNode[]
  | string
  | string[];

export type UserAgent = {
    browser: string | null,
    os: string | null,
    device_type: string | null,
    isBot: boolean
};