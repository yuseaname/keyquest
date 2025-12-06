# Firebase Maintenance Checklist

Use this checklist to maintain and monitor your Firebase integration.

## ?? Daily Checks (If Active Users)

### Firebase Console
- [ ] Check **Usage Dashboard** for unusual spikes
- [ ] Review **Authentication** ? Active users count
- [ ] Check **Firestore** ? Read/write operations
- [ ] Look for errors in **Logs** (if any red indicators)

### Application Health
- [ ] Test game loads correctly
- [ ] Verify auto-save works (check console logs)
- [ ] Check SaveIndicator appears in UI
- [ ] Test offline mode (toggle network in DevTools)

## ?? Weekly Checks

### Usage Monitoring
- [ ] **Firestore Reads**: Track daily average
  - Free tier: 50K/day limit
  - Alert threshold: 40K (80%)
  
- [ ] **Firestore Writes**: Track daily average
  - Free tier: 20K/day limit
  - Alert threshold: 16K (80%)

- [ ] **Storage**: Check total database size
  - Free tier: 1 GB limit
  - Current size: ___ MB

### User Analytics
- [ ] Total anonymous users created
- [ ] Average session duration (if tracking)
- [ ] Most active times (if tracking)
- [ ] Conversion rate (anonymous ? email, future feature)

### Performance
- [ ] Average save time (should be < 500ms)
- [ ] Error rate (should be < 1%)
- [ ] Offline sync success rate

## ?? Monthly Maintenance

### Data Cleanup
- [ ] Review old battle logs (consider archiving)
- [ ] Check for orphaned documents
- [ ] Delete test accounts (if any)
- [ ] Optimize database indexes (if needed)

### Security
- [ ] Review security rules (no changes?)
- [ ] Check for suspicious activity in Auth
- [ ] Update Firebase SDK if new version available
- [ ] Review environment variables (still secure?)

### Costs (If on Blaze Plan)
- [ ] Review billing dashboard
- [ ] Compare estimated vs actual costs
- [ ] Optimize if costs are high
- [ ] Project next month's costs

## ?? Before Deploying Updates

### Pre-Deployment
- [ ] Test locally with production Firebase project
- [ ] Verify environment variables in hosting platform
- [ ] Check for breaking changes in dependencies
- [ ] Review recent Firebase status (no outages?)

### Post-Deployment
- [ ] Verify production site loads
- [ ] Check Firebase connection (console logs)
- [ ] Test auto-save functionality
- [ ] Monitor for errors (first 30 minutes)

## ?? Alert Setup

### Recommended Alerts

1. **Budget Alert (Blaze Plan Only)**
   - Go to Firebase Console ? Usage & Billing
   - Set alert at $10, $25, $50 (adjust as needed)

2. **Quota Alert**
   - Monitor approaching free tier limits
   - Manual check or use Cloud Functions

3. **Error Rate Alert**
   - Set up monitoring (e.g., Sentry, LogRocket)
   - Alert if error rate > 5%

4. **Downtime Alert**
   - Use uptime monitoring (e.g., UptimeRobot)
   - Check every 5 minutes

## ?? Scaling Considerations

### When to Upgrade from Free Tier

Consider upgrading if:
- [ ] Approaching 80% of daily read limit consistently
- [ ] Approaching 80% of daily write limit consistently
- [ ] Need more than 1 GB storage
- [ ] Want guaranteed uptime (SLA)

### Optimization Before Upgrading

Try these first:
1. **Increase auto-save debounce** (2s ? 5s)
   - File: `src/hooks/useAutoSave.ts`
   - Change: `setTimeout(..., 2000)` ? `5000`

2. **Batch writes**
   - Combine multiple updates into single write
   - Use Firestore batch operations

3. **Client-side caching**
   - Cache frequently accessed data
   - Reduce redundant reads

4. **Lazy loading**
   - Don't load all character data upfront
   - Load on-demand (inventory, battle logs)

### Expected Costs at Scale

| Daily Active Users | Reads/Day | Writes/Day | Monthly Cost* |
|-------------------|-----------|------------|---------------|
| 100               | 1K        | 5K         | Free          |
| 500               | 5K        | 25K        | ~$1           |
| 1,000             | 10K       | 50K        | ~$10          |
| 5,000             | 50K       | 250K       | ~$50          |
| 10,000            | 100K      | 500K       | ~$100         |

*Estimates for Blaze plan. Actual costs vary based on usage patterns.

## ?? Troubleshooting Guide

### Issue: High Write Count

**Symptoms:**
- Approaching write limit
- Unexpected billing

**Diagnosis:**
```bash
# Check Firebase Console ? Firestore ? Usage
# Look for spike in write operations
```

**Solutions:**
1. Increase auto-save debounce
2. Check for infinite loops in auto-save hooks
3. Review battle save logic (saving too often?)
4. Implement write throttling per user

### Issue: Slow Save Times

**Symptoms:**
- SaveIndicator shows "Saving..." for > 2 seconds
- Users report lag

**Diagnosis:**
```typescript
// Add timing logs in database.ts
console.time('saveCharacter');
await setDoc(doc(db, 'users', uid, 'characters', id), data);
console.timeEnd('saveCharacter');
```

**Solutions:**
1. Check network latency (use closer Firebase region)
2. Reduce document size (split large arrays)
3. Use batch operations
4. Check Firestore indexes

### Issue: Auth Failures

**Symptoms:**
- Users stuck on loading screen
- Console error: "auth/..."

**Diagnosis:**
```typescript
// Check Firebase Console ? Authentication ? Users
// Look for failed sign-ins
```

**Solutions:**
1. Verify Anonymous auth is enabled
2. Check Firebase config values in `.env`
3. Review security rules
4. Check browser console for specific error codes

### Issue: Data Not Syncing

**Symptoms:**
- Changes not appearing in Firestore
- SaveIndicator shows "Saved" but data missing

**Diagnosis:**
```typescript
// Check useAutoSave hook
// Add debug logs
console.log('Saving character:', characterId, character);
```

**Solutions:**
1. Verify user is authenticated
2. Check security rules (test in Simulator)
3. Review Firestore Console ? Rules ? Playground
4. Check network tab for failed requests

## ?? Documentation Updates

Keep docs updated when:
- [ ] Firebase SDK version changes
- [ ] Security rules modified
- [ ] Database schema changes
- [ ] New features added
- [ ] Known issues discovered

Files to update:
- `README.md` - Overview and quick start
- `FIREBASE_SETUP.md` - Setup instructions
- `ARCHITECTURE.md` - System diagrams
- `CHANGELOG.md` - Version history
- `INTEGRATION_SUMMARY.md` - Integration details

## ?? Security Best Practices

### Regular Security Checks

- [ ] Review security rules quarterly
- [ ] Update Firebase SDK when security patches released
- [ ] Monitor for unusual auth patterns
- [ ] Rotate API keys if compromised (rare)
- [ ] Enable 2FA on Firebase Console account

### Data Privacy

- [ ] Don't store sensitive data (no credit cards, SSNs)
- [ ] Anonymous users = no personal info
- [ ] GDPR compliance (if EU users):
  - Add data export feature
  - Add account deletion feature
  - Add privacy policy

### Security Rules Testing

```javascript
// Test rules in Firebase Console ? Firestore ? Rules ? Playground

// Test 1: User can read own data
match /users/{userId}
auth.uid = userId
read: true ?

// Test 2: User cannot read other user's data
match /users/{otherUserId}
auth.uid ? otherUserId
read: false ?
```

## ?? Support Escalation

### When to Contact Firebase Support

1. **Quota Issues**
   - Unexpected quota exhaustion
   - Need temporary limit increase

2. **Security Concerns**
   - Suspected breach
   - Unusual authentication activity

3. **Technical Issues**
   - Firebase service outage
   - Persistent connection problems

4. **Billing Questions**
   - Unexpected charges
   - Plan upgrade questions

### Support Channels

- **Community**: [StackOverflow (firebase tag)](https://stackoverflow.com/questions/tagged/firebase)
- **Documentation**: [Firebase Docs](https://firebase.google.com/docs)
- **Status**: [Firebase Status Dashboard](https://status.firebase.google.com)
- **Paid Support**: Available on Blaze plan

---

## ? Monthly Checklist Template

Copy this each month:

```
## [Month Year] Firebase Maintenance

### Usage Stats
- Active Users: ___
- Daily Reads: ___ / 50K
- Daily Writes: ___ / 20K
- Storage Used: ___ MB / 1 GB
- Estimated Costs: $___

### Actions Taken
- [ ] Reviewed usage dashboard
- [ ] Checked for errors
- [ ] Updated dependencies (if any)
- [ ] Optimized queries (if needed)
- [ ] Reviewed security rules

### Issues Found
- Issue 1: ___
  - Resolution: ___
- Issue 2: ___
  - Resolution: ___

### Next Month Goals
- [ ] Goal 1
- [ ] Goal 2
- [ ] Goal 3

### Notes
___
```

---

?? **Keep Firebase Healthy!**

Regular maintenance ensures:
? Reliable cloud saves
? Cost optimization
? Security compliance
? Happy users
