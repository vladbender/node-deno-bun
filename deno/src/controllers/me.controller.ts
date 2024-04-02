
import { JsonResponse } from '../utils.ts'

export function MeController(me: string) {
  return {
    me: (): Response => {
      return JsonResponse({
        data: me,
      })
    }
  }
}
