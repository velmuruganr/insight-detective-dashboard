import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { Database, Clock, Search, TrendingUp, AlertTriangle, Zap, Eye, Play } from "lucide-react";

const MySQLQueryAnalyzer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeRange, setTimeRange] = useState("1h");

  const queryPerformanceData = [
    { time: '10:00', avgTime: 1.2, maxTime: 5.4, queries: 847 },
    { time: '10:15', avgTime: 1.8, maxTime: 8.2, queries: 923 },
    { time: '10:30', avgTime: 2.1, maxTime: 12.3, queries: 1056 },
    { time: '10:45', avgTime: 2.8, maxTime: 15.7, queries: 1234 },
    { time: '11:00', avgTime: 3.2, maxTime: 18.9, queries: 1389 },
    { time: '11:15', avgTime: 2.9, maxTime: 14.2, queries: 1167 },
  ];

  const slowQueries = [
    {
      query: "SELECT u.*, p.name FROM users u LEFT JOIN profiles p ON u.id = p.user_id WHERE u.created_at > '2024-01-01'",
      execTime: 15.72,
      lockTime: 0.23,
      rowsExamined: 145623,
      rowsSent: 847,
      frequency: 234,
      database: "application_db",
      suggestions: [
        "Add index on users.created_at",
        "Consider using INNER JOIN instead of LEFT JOIN",
        "Add composite index on (user_id, created_at)"
      ]
    },
    {
      query: "UPDATE orders SET status = 'processed' WHERE payment_status = 'completed' AND created_at < NOW() - INTERVAL 1 HOUR",
      execTime: 12.45,
      lockTime: 2.87,
      rowsExamined: 89234,
      rowsSent: 0,
      frequency: 89,
      database: "orders_db",
      suggestions: [
        "Add index on payment_status",
        "Add index on created_at",
        "Consider batch processing for large updates"
      ]
    },
    {
      query: "SELECT COUNT(*) FROM logs WHERE level = 'ERROR' AND timestamp BETWEEN '2024-01-15 00:00:00' AND '2024-01-15 23:59:59'",
      execTime: 8.93,
      lockTime: 0.12,
      rowsExamined: 567890,
      rowsSent: 1,
      frequency: 456,
      database: "logging_db",
      suggestions: [
        "Add composite index on (level, timestamp)",
        "Consider partitioning logs table by date",
        "Use summary tables for count queries"
      ]
    }
  ];

  const indexAnalysis = [
    { table: 'users', indexes: 5, unusedIndexes: 2, missingIndexes: 1, efficiency: 73 },
    { table: 'orders', indexes: 8, unusedIndexes: 1, missingIndexes: 3, efficiency: 85 },
    { table: 'products', indexes: 6, unusedIndexes: 3, missingIndexes: 0, efficiency: 67 },
    { table: 'logs', indexes: 3, unusedIndexes: 0, missingIndexes: 2, efficiency: 91 },
  ];

  const connectionStats = [
    { metric: 'Active Connections', value: 47, max: 200, utilization: 23.5 },
    { metric: 'Query Cache Hit Rate', value: 87.3, max: 100, utilization: 87.3 },
    { metric: 'InnoDB Buffer Pool', value: 78.9, max: 100, utilization: 78.9 },
    { metric: 'Temporary Tables', value: 234, max: 1000, utilization: 23.4 },
  ];

  const queryCategories = [
    { category: 'SELECT', count: 8947, avgTime: 1.23, color: '#3B82F6' },
    { category: 'INSERT', count: 2847, avgTime: 0.45, color: '#10B981' },
    { category: 'UPDATE', count: 1256, avgTime: 2.87, color: '#F59E0B' },
    { category: 'DELETE', count: 389, avgTime: 1.67, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-slate-800/30 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Database className="h-5 w-5 mr-2 text-blue-400" />
            MySQL Query Analysis Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search queries by text, table, or database..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48 bg-slate-700/50 border-slate-600 text-white">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="15m">Last 15 minutes</SelectItem>
                <SelectItem value="1h">Last hour</SelectItem>
                <SelectItem value="6h">Last 6 hours</SelectItem>
                <SelectItem value="24h">Last 24 hours</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              <Play className="h-4 w-4 mr-2" />
              Live Monitor
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Connection & Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {connectionStats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/30 border-slate-700">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm font-medium">{stat.metric}</span>
                  <Badge 
                    variant={stat.utilization > 80 ? 'destructive' : stat.utilization > 60 ? 'secondary' : 'default'}
                    className="text-xs"
                  >
                    {stat.utilization.toFixed(1)}%
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-400">Max: {stat.max}</p>
                </div>
                <Progress value={stat.utilization} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="slow-queries" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-700/50">
          <TabsTrigger value="slow-queries" className="data-[state=active]:bg-blue-600">
            <Clock className="h-4 w-4 mr-2" />
            Slow Queries
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-blue-600">
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="index-analysis" className="data-[state=active]:bg-blue-600">
            <Zap className="h-4 w-4 mr-2" />
            Index Analysis
          </TabsTrigger>
          <TabsTrigger value="query-patterns" className="data-[state=active]:bg-blue-600">
            <Database className="h-4 w-4 mr-2" />
            Query Patterns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="slow-queries" className="mt-6">
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="h-5 w-5 mr-2 text-red-400" />
                Slow Query Analysis
              </CardTitle>
              <CardDescription className="text-slate-400">
                Queries with execution time &gt; 1 second, ordered by frequency and impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {slowQueries.map((query, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Badge variant="destructive" className="text-xs">SLOW</Badge>
                        <span className="text-sm text-slate-400">{query.database}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="text-slate-400">
                          <span className="text-red-400 font-bold">{query.execTime}s</span> exec time
                        </div>
                        <div className="text-slate-400">
                          <span className="text-white font-bold">{query.frequency}</span> times
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4 p-3 bg-slate-900/50 rounded font-mono text-sm text-slate-300 overflow-x-auto">
                      {query.query}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-xs text-slate-400">Execution Time</span>
                        <p className="text-white font-medium">{query.execTime}s</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400">Lock Time</span>
                        <p className="text-white font-medium">{query.lockTime}s</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400">Rows Examined</span>
                        <p className="text-white font-medium">{query.rowsExamined.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400">Rows Sent</span>
                        <p className="text-white font-medium">{query.rowsSent.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
                        Optimization Suggestions
                      </h4>
                      <ul className="space-y-1">
                        {query.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-sm text-slate-300 flex items-center">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                        <Eye className="h-4 w-4 mr-2" />
                        Explain Plan
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                        Generate Index
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                        Create Alert
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                Query Performance Trends
              </CardTitle>
              <CardDescription className="text-slate-400">
                Query execution time and throughput over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={queryPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis yAxisId="time" orientation="left" stroke="#9CA3AF" />
                  <YAxis yAxisId="queries" orientation="right" stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Area yAxisId="time" type="monotone" dataKey="maxTime" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                  <Area yAxisId="time" type="monotone" dataKey="avgTime" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Line yAxisId="queries" type="monotone" dataKey="queries" stroke="#10B981" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="index-analysis" className="mt-6">
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                Index Efficiency Analysis
              </CardTitle>
              <CardDescription className="text-slate-400">
                Index usage statistics and optimization opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {indexAnalysis.map((table, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-white">{table.table}</span>
                        <Badge 
                          variant={table.efficiency > 80 ? 'default' : table.efficiency > 60 ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {table.efficiency}% efficient
                        </Badge>
                      </div>
                      <Progress value={table.efficiency} className="w-32 h-2" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <span className="text-xs text-slate-400">Total Indexes</span>
                        <p className="text-lg font-bold text-white">{table.indexes}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400">Unused Indexes</span>
                        <p className="text-lg font-bold text-red-400">{table.unusedIndexes}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400">Missing Indexes</span>
                        <p className="text-lg font-bold text-yellow-400">{table.missingIndexes}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                        Optimize
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="query-patterns" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Database className="h-5 w-5 mr-2 text-purple-400" />
                  Query Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={queryCategories}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="category" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151', 
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                    <Bar dataKey="count" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Query Performance by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {queryCategories.map((category, index) => (
                    <div key={index} className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="font-medium text-slate-300">{category.category}</span>
                        </div>
                        <span className="text-white font-bold">{category.avgTime}s avg</span>
                      </div>
                      <div className="text-sm text-slate-400">
                        {category.count.toLocaleString()} queries
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { MySQLQueryAnalyzer };
