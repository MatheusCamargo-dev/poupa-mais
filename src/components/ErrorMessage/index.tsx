type ErrorMessage = {
  errorMessage: {
    message: string;
  };
};
export default function ErrorMessage(props: any) {
  const { errorMessage } = props;
  return <p className="text-red-500 p-0">{errorMessage.message}</p>;
}
