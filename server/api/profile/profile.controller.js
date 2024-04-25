import {
  findProfileByEmail,
  findProfilesByCountry,
  findUserCountByModuleAndScore,
} from "../pub/profile.model";

export const index = async (ctx, next) => {
  const { email } = ctx.request.query;
  await findProfileByEmail(email)
    .then((profile) => {
      if (profile && profile.profile) {
        ctx.status = 200;
        ctx.body = { profile };
      } else {
        ctx.status = 404;
        ctx.body = { error: "Not Found" };
      }
    })
    .catch((error) => {
      console.log(error);
      ctx.status = 500;
      ctx.body = { error };
    });
  await next();
};

export const getProfilesByCountry = async (ctx, next) => {
  const { country } = ctx.request.query;

  if (!country) {
    ctx.status = 400;
    ctx.body = { error: "Missing required parameters" };
    await next();
    return;
  }

  try {
    const profiles = await findProfilesByCountry(country);

    if (profiles.length > 0) {
      ctx.status = 200;
      ctx.body = { profiles };
    } else {
      ctx.status = 404;
      ctx.body = {
        error: "No profiles found matching the specified condition",
      };
    }
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error };
  }

  await next();
};

export const getUserCountByModuleAndScore = async (ctx, next) => {
  const { country, targetScore } = ctx.request.query;

  if (!country || !targetScore) {
    ctx.status = 400;
    ctx.body = { error: "Missing required parameters" };
    await next();
    return;
  }

  try {
    const userCounts = await findUserCountByModuleAndScore(country, parseInt(targetScore, 10));

    ctx.status = 200;
    ctx.body = { userCounts };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error };
  }

  await next();
};
