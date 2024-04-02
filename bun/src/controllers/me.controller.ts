
import { JsonResponse } from '../utils'

export function MeController(me: string) {
  return {
    me: (): Response => {
      return JsonResponse({
        data: me,
      })
    }
  }
}
