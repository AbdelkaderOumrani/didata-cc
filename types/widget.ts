export enum WidgetType {
  TEXT = "text",
  LINK = "link",
  IMAGE = "image",
}

export interface WidgetBase {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TextWidget extends WidgetBase {
  type: WidgetType.TEXT;
  content: string;
}

export interface LinkWidget extends WidgetBase {
  type: WidgetType.LINK;
  url: string;
  label: string;
}

export interface ImageWidget extends WidgetBase {
  type: WidgetType.IMAGE;
  imageUrl: string;
  altText?: string;
}

export type Widget = TextWidget | LinkWidget | ImageWidget;

export type TextWidgetUpdate = Partial<Omit<TextWidget, "id" | "type">>;
export type LinkWidgetUpdate = Partial<Omit<LinkWidget, "id" | "type">>;
export type ImageWidgetUpdate = Partial<Omit<ImageWidget, "id" | "type">>;

export type WidgetUpdate =
  | TextWidgetUpdate
  | LinkWidgetUpdate
  | ImageWidgetUpdate;
