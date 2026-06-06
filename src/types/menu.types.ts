/**
 * Menu item document.
 * Per Database Spec §20.
 */
export interface MenuItem {
  id: string;
  title: string;
  url: string;
  target: MenuTarget;
  sort_order: number;
  visible: boolean;
  icon?: string;
  parent_id?: string;
}

/**
 * Menu link target types.
 * Per Admin Spec §14.
 */
export type MenuTarget =
  | "internal"
  | "category"
  | "collection"
  | "external";
