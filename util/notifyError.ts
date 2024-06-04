import type { AxiosError } from "axios";

import { toast } from "sonner";

export function notifyError(err: AxiosError<any>) {
  console.error(err);

  toast.error(
    err.response?.data.message
    || err.message
    || "Unexpected error, check console",
  );
}
