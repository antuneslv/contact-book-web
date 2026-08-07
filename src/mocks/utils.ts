export function setResponses(responseJson?: object | string) {
  return {
    success: {
      data: responseJson,
      status: 200,
    },

    successCreated: {
      data: responseJson,
      status: 201,
    },

    successNoContent: {
      data: undefined,
      status: 204,
    },

    unauthorizedError: {
      data: {
        message: 'Invalid token',
        error: 'Unauthorized',
      },
      status: 401,
    },

    serverError: {
      data: {
        message: 'Internal server error',
      },
      status: 500,
    },
  }
}
