type Props = {
  title: string
}

export default function PageTitle({ title }: Props) {
  return (
    <h2 className='text-4xl font-bold'>{title}</h2>
  );
}
