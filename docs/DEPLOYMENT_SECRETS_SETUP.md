# GitHub Secrets Setup Guide

This guide walks through setting up all required secrets for SpreadsheetMoment deployment.

---

## Required Secrets

### 1. Cloudflare Workers AI (FREE tier)

**Purpose:** Free AI inference for agent reasoning

**Setup Steps:**
1. Go to https://dash.cloudflare.com/
2. Sign up or log in
3. Navigate to: **Workers & Pages** → **Overview**
4. Get your **Account ID** (right side of dashboard)
5. Go to: **Get API Token** → **Create Custom Token**
6. Create token with permissions:
   - Account - Workers Scripts - Edit
   - Account - Account Settings - Read
7. Copy the token

**GitHub Secret Name:** `CLOUDFLARE_API_TOKEN`
**GitHub Secret Name:** `CLOUDFLARE_ACCOUNT_ID`

---

### 2. npm (for package publishing)

**Purpose:** Publish @spreadsheet-moment packages to npm

**Setup Steps:**
1. Go to https://www.npmjs.com/
2. Log in or sign up
3. Create an access token:
   - Go to **Access Tokens**
   - Click **Generate New Token**
   - Select **Automation** (or **Granular Access** for more control)
   - Set expiration (recommended: 90 days)
   - Copy the token

**GitHub Secret Name:** `NPM_TOKEN`

---

### 3. GitHub Token (for workflow permissions)

**Purpose:** Allow GitHub Actions to create releases and push changes

**Setup Steps:**
1. Go to https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Set expiration (recommended: 90 days)
4. Select scopes:
   - ✅ `repo` (full control)
   - ✅ `workflow` (for GitHub Actions)
5. Click **Generate token**
6. Copy the token

**GitHub Secret Name:** `GH_TOKEN` or `GITHUB_TOKEN` (auto-created)

---

## Adding Secrets to GitHub

### Option 1: Via GitHub Web UI

1. Go to: https://github.com/SuperInstance/spreadsheet-moment/settings/secrets/actions
2. Click **New repository secret**
3. Add each secret:
   - **Name:** [Secret name from above]
   - **Value:** [Paste the token/value]
   - Click **Add secret**

### Option 2: Via GitHub CLI

```bash
# Install GitHub CLI if not installed
# https://cli.github.com/

# Login
gh auth login

# Add secrets
gh secret set CLOUDFLARE_API_TOKEN
gh secret set CLOUDFLARE_ACCOUNT_ID
gh secret set NPM_TOKEN

# Verify secrets
gh secret list
```

---

## Secrets Verification

After setting up, verify all secrets are configured:

```bash
# Via GitHub CLI
gh secret list

# Expected output:
# CLOUDFLARE_API_TOKEN              Updated 2024-03-15
# CLOUDFLARE_ACCOUNT_ID             Updated 2024-03-15
# NPM_TOKEN                         Updated 2024-03-15
# GITHUB_TOKEN                      Updated 2024-03-15
```

---

## Security Best Practices

1. **Rotate Regularly:** Set expiration dates and rotate tokens quarterly
2. **Limit Permissions:** Use granular access instead of full permissions
3. **Monitor Usage:** Check token usage logs regularly
4. **Never Commit:** Never commit secrets to git (add to `.gitignore`)
5. **Use Environment Variables:** Different secrets for dev/staging/prod
6. **Audit Regularly:** Review and remove unused tokens

---

## Troubleshooting

### Cloudflare Deployment Fails

**Error:** `Error: Unknown Account`

**Solution:**
- Verify `CLOUDFLARE_ACCOUNT_ID` is correct (32 character hex string)
- Check token has Workers Scripts permission
- Ensure account is active

### npm Publish Fails

**Error:** `404 Not Found - PUT https://registry.npmjs.org/@spreadsheet-moment`

**Solution:**
- Verify package name in `package.json` matches your npm org
- Ensure `NPM_TOKEN` has Automation or Granular Access
- First publish requires manual package creation on npm

### GitHub Release Fails

**Error:** `Resource not accessible by integration`

**Solution:**
- Add `contents: write` permission to workflow YAML
- Ensure `GITHUB_TOKEN` has `repo` scope

---

## Environment-Specific Secrets

For different environments, use prefixes:

```yaml
# Development
env: CLOUDFLARE_API_TOKEN_DEV

# Staging
env: CLOUDFLARE_API_TOKEN_STAGING

# Production
env: CLOUDFLARE_API_TOKEN_PROD
```

---

## Next Steps

After secrets are configured:

1. **Test CI Workflow:** Push to `feature/**` branch
2. **Test Deployment:** Merge to `main` branch
3. **Verify Packages:** Check https://www.npmjs.com/org/spreadsheet-moment
4. **Monitor Cloudflare:** Check Workers dashboard

---

## Emergency: Secret Rotation

If a secret is compromised:

1. **Revoke immediately:** Delete from source provider
2. **Generate new:** Create replacement token
3. **Update GitHub:** Replace the secret value
4. **Rotate deployments:** Redeploy with new secret
5. **Audit logs:** Check for unauthorized usage

---

**Need Help?** See:
- Cloudflare Workers Docs: https://developers.cloudflare.com/workers/
- npm Publishing: https://docs.npmjs.com/cli/v9/commands/npm-publish
- GitHub Actions Secrets: https://docs.github.com/en/actions/security-guides/encrypted-secrets
