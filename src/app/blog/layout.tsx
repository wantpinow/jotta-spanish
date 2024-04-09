export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-xl">{children}</div>;
}
