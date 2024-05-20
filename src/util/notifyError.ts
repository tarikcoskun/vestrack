import type { AxiosError } from "axios";

import { toast } from "sonner";

export const notifyError = (err: AxiosError<any>) => {
  console.error(err);

  toast.error(
    err.response?.data.message ||
      err.message ||
      "Unexpected error, check console"
  );
};
