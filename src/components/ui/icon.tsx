import {
  Car, Compass, ConciergeBell, Droplet, Footprints, Key, Layers, LayoutGrid, Leaf, Recycle, Scale, Sprout, Sun, Trees, Users, Waves, Wind,
  type LucideIcon,
} from "lucide-react";

/** One line-icon set, 1.5 px stroke, always paired with a text label (BRD §6.6). */
const icons: Record<string, LucideIcon> = {
  car: Car, compass: Compass, concierge: ConciergeBell, droplet: Droplet, footprints: Footprints, key: Key, layers: Layers,
  layout: LayoutGrid, leaf: Leaf, recycle: Recycle, scale: Scale, sprout: Sprout, sun: Sun, trees: Trees, users: Users,
  waves: Waves, wind: Wind,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = icons[name] ?? Leaf;
  return <C aria-hidden strokeWidth={1.5} className={className} />;
}
